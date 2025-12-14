import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Clock, FileText, Image, Video, File, GitBranch } from 'lucide-react-native';
import { useProjects } from '@/hooks/useProjects';

export default function ProjectsScreen() {
  const router = useRouter();
  const { projects, loading } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [projectDraftCounts, setProjectDraftCounts] = useState<Record<string, number>>({});

  // For now, we'll use sample draft counts - in a real implementation,
  // you'd fetch this from the database
  useState(() => {
    const mockCounts: Record<string, number> = {};
    projects.forEach(project => {
      mockCounts[project.id] = Math.floor(Math.random() * 5) + 1;
    });
    setProjectDraftCounts(mockCounts);
  });

  const getInputIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image size={16} color="#666" />;
      case 'video':
        return <Video size={16} color="#666" />;
      case 'text':
      default:
        return <FileText size={16} color="#666" />;
    }
  };

  const getOutputBadge = (type: string) => {
    const labels: Record<string, string> = {
      deck: 'Deck',
      image: 'Image',
      video: 'Video',
      mockup: 'Mockup',
      copy: 'Copy',
      summary: 'Summary',
    };
    return labels[type] || type;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>
          Your creative history
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search projects..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={styles.emptyState}>
            <Text style={styles.loadingText}>Loading projects...</Text>
          </View>
        ) : projects.length === 0 ? (
          <View style={styles.emptyState}>
            <File size={48} color="#ccc" />
            <Text style={styles.emptyTitle}>No projects yet</Text>
            <Text style={styles.emptyText}>
              Start creating to see your projects here
            </Text>
          </View>
        ) : (
          projects
            .filter(project =>
              project.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((project) => {
              const draftCount = projectDraftCounts[project.id] || 0;
              return (
                <TouchableOpacity
                  key={project.id}
                  style={styles.projectCard}
                  onPress={() => router.push(`/draft-workspace/${project.id}` as any)}
                >
                  <View style={styles.projectHeader}>
                    <View style={styles.projectTitleRow}>
                      {getInputIcon(project.input_type)}
                      <Text style={styles.projectTitle}>{project.title}</Text>
                    </View>
                    <View style={styles.statusBadge}>
                      <GitBranch size={12} color="#666" />
                      <Text style={styles.statusText}>
                        {draftCount} draft{draftCount !== 1 ? 's' : ''}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.outputsContainer}>
                    <View style={styles.outputBadge}>
                      <Text style={styles.outputBadgeText}>
                        {getOutputBadge(project.intent)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.projectFooter}>
                    <Clock size={14} color="#999" />
                    <Text style={styles.timestampText}>
                      {new Date(project.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#999',
  },
  statusDotCompleted: {
    backgroundColor: '#22c55e',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textTransform: 'capitalize',
  },
  outputsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  outputBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  outputBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  projectFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  timestampText: {
    fontSize: 12,
    color: '#999',
  },
});
