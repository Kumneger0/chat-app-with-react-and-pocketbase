export interface User {
  user: any;
  updateUser: (newUser: any) => void;
}

export interface ContextType {
  authState: string;
  setAuthState: (auth: string) => void;
}

export interface SelectedItem {
  selectedItem: string;
  selectedConversation: string | null;
  updateSelectedItem: (item: string | null) => void;
  updateSelectedConversation: (conversationId: string) => void;
}
