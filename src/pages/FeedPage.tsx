import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import {
  Home,
  Search,
  Heart,
  PlusSquare,
  Image as ImageIcon,
  Smile,
  Bookmark,
  MoreHorizontal,
  MessageCircle,
  Send,
  Grid,
  X,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../Navigation';

// ---------- DUMMY DATA (Firebase baad mein connect hoga) ----------
const initialPosts = [
  {
    id: '1',
    username: 'john_doe',
    name: 'John Doe',
    text: 'Beautiful day today!',
    likes: 12,
    liked: false,
    saved: false,
    userId: 'other1',
  },
  {
    id: '2',
    username: 'emma.w',
    name: 'Emma W',
    text: 'Working on something exciting 🚀',
    likes: 5,
    liked: false,
    saved: false,
    userId: 'other2',
  },
];

const dummyNotifications = [
  { id: 'n1', text: 'john_doe liked your post', type: 'like' },
  { id: 'n2', text: 'emma.w started following you', type: 'follow' },
];

const dummyMessages = [
  { name: 'john_doe', status: 'Active now', img: 'https://i.pravatar.cc/100?img=12' },
  { name: 'emma.w', status: 'Active 5m ago', img: 'https://i.pravatar.cc/100?img=32' },
];

const myProfile = {
  uid: 'me',
  name: 'User',
  username: 'user',
  bio: 'This is my bio',
  dob: '2000-01-01',
  accountType: 'public',
  followers: [],
  following: [],
};

// ==================== MAIN COMPONENT ====================
export default function FeedPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [view, setView] = useState<'feed' | 'profile' | 'notifications' | 'chat'>('feed');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState(initialPosts);

  const initials = myProfile.name.slice(0, 2).toUpperCase();

  function handlePost() {
    if (!postText.trim()) {
      Alert.alert('Error', 'Kuch likho pehle');
      return;
    }
    const newPost = {
      id: Date.now().toString(),
      username: myProfile.username,
      name: myProfile.name,
      text: postText,
      likes: 0,
      liked: false,
      saved: false,
      userId: 'me',
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  }

  function toggleLike(id: string) {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    );
  }

  function toggleSave(id: string) {
    setPosts(posts.map((post) => (post.id === id ? { ...post, saved: !post.saved } : post)));
  }

  function handleDelete(id: string) {
    setPosts(posts.filter((post) => post.id !== id));
  }

  function openChat(user: any) {
    setSelectedUser(user);
    setView('chat');
  }

  // ---------- VIEW: CHAT ----------
  if (view === 'chat') {
    return <ChatScreen selectedUser={selectedUser} goBack={() => setView('feed')} />;
  }

  // ---------- VIEW: NOTIFICATIONS ----------
  if (view === 'notifications') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.simpleHeader}>
          <TouchableOpacity onPress={() => setView('feed')}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <Text style={styles.pageTitle}>Notifications</Text>
          {dummyNotifications.length === 0 ? (
            <Text style={styles.emptyText}>No notifications yet</Text>
          ) : (
            dummyNotifications.map((n) => (
              <View key={n.id} style={styles.notificationRow}>
                <Text>{n.text}</Text>
                <Text style={styles.notificationType}>{n.type}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ---------- VIEW: PROFILE ----------
  if (view === 'profile') {
    const profilePosts = posts.filter((post) => post.userId === 'me');

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.simpleHeader}>
          <TouchableOpacity onPress={() => setView('feed')}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerUsername}>{myProfile.username}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Edit Profile', 'Coming soon')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>
          <View style={styles.profileTop}>
            <View style={styles.profileAvatarLarge}>
              <Text style={styles.profileAvatarText}>{initials}</Text>
            </View>

            <View style={styles.profileStats}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{profilePosts.length}</Text>
                <Text style={styles.statLabel}>posts</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{myProfile.followers.length}</Text>
                <Text style={styles.statLabel}>followers</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{myProfile.following.length}</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>

          <Text style={styles.nameText}>{myProfile.name}</Text>
          <Text style={styles.bioText}>{myProfile.bio}</Text>
          <Text style={styles.dobText}>DOB: {myProfile.dob}</Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert('Logged out', 'Logged out successfully');
              navigation.navigate('Auth');
            }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.postsHeaderRow}>
            <Grid size={18} color="#0f172a" />
            <Text style={styles.postsHeaderText}>POSTS</Text>
          </View>

          <View style={styles.gridContainer}>
            {profilePosts.length === 0 ? (
              <Text style={styles.emptyText}>No posts yet</Text>
            ) : (
              profilePosts.map((post) => (
                <View key={post.id} style={styles.gridItem}>
                  <Text style={styles.gridItemText} numberOfLines={4}>
                    {post.text}
                  </Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ---------- VIEW: FEED (default) ----------
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logo}>Netaji</Text>
        <TouchableOpacity>
          <Search size={22} color="#475569" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Create Post Box */}
        <View style={styles.createPostBox}>
          <View style={styles.createPostHeader}>
            <TouchableOpacity style={styles.avatarCircle} onPress={() => setView('profile')}>
              <Text style={styles.avatarText}>{initials}</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.nameText}>{myProfile.name}</Text>
              <Text style={styles.usernameText}>@{myProfile.username}</Text>
            </View>
          </View>

          <TextInput
            style={styles.postInput}
            placeholder="What's on your mind?"
            value={postText}
            onChangeText={setPostText}
            multiline
          />

          <View style={styles.postActions}>
            <View style={styles.postActionsLeft}>
              <TouchableOpacity onPress={() => Alert.alert('Coming soon', 'Image upload coming soon')}>
                <ImageIcon size={22} color="#475569" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPostText(postText + ' 😊')}>
                <Smile size={22} color="#475569" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts List */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postHeaderLeft}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{post.username.slice(0, 2).toUpperCase()}</Text>
                </View>
                <View>
                  <Text style={styles.nameText}>{post.username}</Text>
                  <Text style={styles.usernameText}>Just now</Text>
                </View>
              </View>

              {post.userId === 'me' ? (
                <TouchableOpacity onPress={() => handleDelete(post.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              ) : (
                <MoreHorizontal size={22} color="#475569" />
              )}
            </View>

            <View style={styles.postBody}>
              <Text style={styles.postBodyText}>{post.text}</Text>
            </View>

            <View style={styles.postFooter}>
              <View style={styles.postFooterLeft}>
                <TouchableOpacity onPress={() => toggleLike(post.id)}>
                  <Heart size={26} color={post.liked ? '#ef4444' : '#0f172a'} fill={post.liked ? '#ef4444' : 'none'} />
                </TouchableOpacity>
                <MessageCircle size={26} color="#0f172a" />
                <Send size={26} color="#0f172a" />
              </View>

              <TouchableOpacity onPress={() => toggleSave(post.id)}>
                <Bookmark size={26} color={post.saved ? '#7e22ce' : '#0f172a'} fill={post.saved ? '#7e22ce' : 'none'} />
              </TouchableOpacity>
            </View>

            <Text style={styles.likesText}>{post.likes} likes</Text>
            <Text style={styles.captionText}>
              <Text style={styles.nameText}>{post.username} </Text>
              {post.text}
            </Text>
          </View>
        ))}

        {/* Messages Section */}
        <Text style={styles.messagesHeader}>Messages</Text>
        {dummyMessages.map((msg, index) => (
          <TouchableOpacity key={index} style={styles.messageRow} onPress={() => openChat(msg)}>
            <Image source={{ uri: msg.img }} style={styles.messageAvatar} />
            <View>
              <Text style={styles.nameText}>{msg.name}</Text>
              <Text style={styles.usernameText}>{msg.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setView('feed')}>
          <Home size={26} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Search size={26} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity>
          <PlusSquare size={26} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setView('notifications')}>
          <Heart size={26} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarCircleSmall} onPress={() => setView('profile')}>
          <Text style={styles.avatarTextSmall}>{initials}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ==================== CHAT SCREEN ====================
function ChatScreen({ selectedUser, goBack }: any) {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', text: 'Hey there!', sender: 'them' },
    { id: '2', text: 'Hi! How are you?', sender: 'me' },
  ]);
  const [text, setText] = useState('');

  function sendMessage() {
    if (!text.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text, sender: 'me' }]);
    setText('');
  }

  if (!selectedUser) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Image source={{ uri: selectedUser.img }} style={styles.chatAvatar} />
        <Text style={styles.nameText}>{selectedUser.name}</Text>
      </View>

      <ScrollView style={styles.container}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.chatBubbleRow, msg.sender === 'me' && styles.chatBubbleRowMe]}
          >
            <Text
              style={[
                styles.chatBubble,
                msg.sender === 'me' ? styles.chatBubbleMe : styles.chatBubbleThem,
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.chatInputRow}>
        <TextInput
          style={styles.chatInput}
          placeholder="Type message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.chatSendButton} onPress={sendMessage}>
          <Text style={styles.chatSendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ==================== STYLES ====================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  logo: { fontSize: 22, fontWeight: '800', color: '#7e22ce' },
  container: { flex: 1, paddingHorizontal: 12 },
  createPostBox: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  createPostHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatarCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#7e22ce',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#ffffff', fontWeight: '700' },
  avatarCircleSmall: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#7e22ce',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTextSmall: { color: '#ffffff', fontWeight: '700', fontSize: 11 },
  nameText: { fontWeight: '700', color: '#0f172a' },
  usernameText: { fontSize: 12, color: '#64748b' },
  postInput: { minHeight: 60, textAlignVertical: 'top', fontSize: 14, color: '#1e293b' },
  postActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  postActionsLeft: { flexDirection: 'row', gap: 16 },
  postButton: { backgroundColor: '#7e22ce', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  postButtonText: { color: '#ffffff', fontWeight: '700' },
  postCard: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16, marginBottom: 20, padding: 16 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  postHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  deleteText: { color: '#ef4444', fontWeight: '700', fontSize: 13 },
  postBody: { backgroundColor: '#f1f5f9', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 12 },
  postBodyText: { fontSize: 16, textAlign: 'center', color: '#1e293b' },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  postFooterLeft: { flexDirection: 'row', gap: 16 },
  likesText: { fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  captionText: { color: '#1e293b' },
  bottomNav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  messagesHeader: { fontWeight: '800', fontSize: 16, marginBottom: 12, color: '#0f172a' },
  messageRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  messageAvatar: { height: 44, width: 44, borderRadius: 22 },

  // Simple header (profile/notifications)
  simpleHeader: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backText: { fontWeight: '700', color: '#0f172a', fontSize: 16 },
  headerUsername: { fontWeight: '700', fontSize: 16, color: '#0f172a' },
  editText: { fontWeight: '700', color: '#7e22ce' },
  pageTitle: { fontSize: 22, fontWeight: '800', marginVertical: 16, color: '#0f172a' },
  emptyText: { color: '#64748b', textAlign: 'center', marginTop: 20 },
  notificationRow: { borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingVertical: 12 },
  notificationType: { fontSize: 11, color: '#94a3b8', marginTop: 4 },

  // Profile view
  profileTop: { flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 20, marginBottom: 16 },
  profileAvatarLarge: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: '#7e22ce',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: { color: '#ffffff', fontWeight: '800', fontSize: 28 },
  profileStats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNumber: { fontWeight: '800', fontSize: 16, color: '#0f172a' },
  statLabel: { fontSize: 12, color: '#64748b' },
  bioText: { color: '#1e293b', marginTop: 4 },
  dobText: { color: '#64748b', fontSize: 12, marginTop: 4 },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutText: { color: '#ffffff', fontWeight: '700' },
  postsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginTop: 20,
  },
  postsHeaderText: { fontWeight: '700', color: '#0f172a' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  gridItem: {
    width: '32.5%',
    aspectRatio: 1,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  gridItemText: { fontSize: 11, textAlign: 'center', color: '#1e293b' },

  // Chat screen
  chatHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  chatAvatar: { height: 36, width: 36, borderRadius: 18 },
  chatBubbleRow: { marginVertical: 6, alignItems: 'flex-start' },
  chatBubbleRowMe: { alignItems: 'flex-end' },
  chatBubble: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, maxWidth: '75%', overflow: 'hidden' },
  chatBubbleMe: { backgroundColor: '#7e22ce', color: '#ffffff' },
  chatBubbleThem: { backgroundColor: '#e2e8f0', color: '#0f172a' },
  chatInputRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  chatSendButton: {
    backgroundColor: '#7e22ce',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 10,
  },
  chatSendText: { color: '#ffffff', fontWeight: '700' },
});