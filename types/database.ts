export type InputType = 'text' | 'image' | 'video' | 'audio';
export type ProjectStatus = 'active' | 'completed' | 'archived';
export type DraftStatus = 'generating' | 'completed' | 'failed' | 'locked';
export type OutputType = 'deck' | 'image' | 'video' | 'summary' | 'mockup' | 'copy';
export type OutputStatus = 'generating' | 'completed' | 'failed';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface Project {
  id: string;
  user_id: string;
  title: string;
  input_type: InputType;
  input_content?: string;
  input_url?: string;
  intent: string;
  tags: string[];
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Draft {
  id: string;
  project_id: string;
  parent_draft_id?: string;
  version_number: number;
  title: string;
  content?: string;
  status: DraftStatus;
  is_locked: boolean;
  locked_at?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface DraftOutput {
  id: string;
  draft_id: string;
  output_type: OutputType;
  output_url?: string;
  output_data: Record<string, any>;
  status: OutputStatus;
  created_at: string;
}

export interface UserSettings {
  user_id: string;
  connected_integrations: Record<string, any>;
  preferences: Record<string, any>;
  memory_enabled: boolean;
  local_mode: boolean;
  subscription_tier: SubscriptionTier;
  created_at: string;
  updated_at: string;
}
