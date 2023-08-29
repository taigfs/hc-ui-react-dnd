import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Tipo para a mensagem (ajuste conforme suas necessidades)
interface Message {
  id: number;
  type: string;
  payload: any;
}

// Atom para armazenar as mensagens
export const messagesAtom = atomWithStorage<Message[]>('messages', []);

// Atom para adicionar uma nova mensagem
export const addMessageAtom = atom(
  null,
  (get, set, newMessage: Message) => {
    const currentMessages = get(messagesAtom);
    set(messagesAtom, [...currentMessages, newMessage]);
  }
);

// Atom para obter a última mensagem
export const getLastMessageAtom = atom((get) => {
  const messages = get(messagesAtom);
  return messages[messages.length - 1] || null;
});

// Atom para limpar todas as mensagens
export const clearMessagesAtom = atom(
  null,
  (get, set) => {
    set(messagesAtom, []);
  }
);

// Use este atom no seu componente para acessar e manipular as mensagens
export const useMessageStore = () => {
  return {
    getLastMessage: useAtom(getLastMessageAtom),
    addMessage: useUpdateAtom(addMessageAtom),
    clearMessages: useUpdateAtom(clearMessagesAtom),
  };
};
