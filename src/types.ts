export interface User {
  user: any;
  updateUser: (newUser: any) => void;
}

export interface ContextType {
  authState: string;
  setAuthState: (auth: string) => void;
}

export interface SelectedItem {
  selectedItem: string | null;
  selectedConversation: string | null;
  updateSelectedItem: (item: string | null) => void;
  updateSelectedConversation: (conversationId: string | null) => void;
}
