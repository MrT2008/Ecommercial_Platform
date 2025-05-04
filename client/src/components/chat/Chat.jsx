import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeContact, setActiveContact] = useState(null);
  const [contacts, setContacts] = useState([
    { id: 1, name: "Shop A", avatar: "https://randomuser.me/api/portraits/men/1.jpg", unread: 2 },
    { id: 2, name: "Shop B", avatar: "https://randomuser.me/api/portraits/women/2.jpg", unread: 0 },
    { id: 3, name: "Shop C", avatar: "https://randomuser.me/api/portraits/men/3.jpg", unread: 5 },
  ]);
  const [conversations, setConversations] = useState({
    1: [
      { sender: "them", text: "Hello, how can I help you?", time: "10:30 AM" },
      { sender: "me", text: "I'm interested in your products", time: "10:32 AM" },
      { sender: "them", text: "Great! What would you like to know?", time: "10:33 AM" },
    ],
    2: [
      { sender: "them", text: "Welcome to our shop!", time: "Yesterday" },
      { sender: "me", text: "Do you have this item in stock?", time: "Yesterday" },
    ],
    3: [
      { sender: "them", text: "Thank you for your order", time: "2 days ago" },
      { sender: "me", text: "When will it be delivered?", time: "2 days ago" },
      { sender: "them", text: "It should arrive by Friday", time: "2 days ago" },
    ],
  });

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change or chat opens
    if (chatContainerRef.current && isOpen) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [isOpen, activeContact, conversations]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleContactSelect = (contactId) => {
    setActiveContact(contactId);
    // Mark messages as read when selecting a contact
    setContacts(contacts.map(c => 
      c.id === contactId ? {...c, unread: 0} : c
    ));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeContact) return;

    const newMessage = {
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setConversations(prev => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMessage]
    }));
    setMessage("");

    // Simulate response (would be replaced with actual backend communication)
    setTimeout(() => {
      const response = {
        sender: "them",
        text: "Thanks for your message! I'll get back to you soon.",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setConversations(prev => ({
        ...prev,
        [activeContact]: [...(prev[activeContact] || []), response]
      }));
    }, 1000);
  };

  return (
    <>
      {/* Chat icon button */}
      <div 
        className="fixed bottom-6 right-6 bg-blue-950 text-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(255,255,255,0.7)] z-50 hover:bg-blue-700 transition-colors"
        onClick={toggleChat}
      >
        <FontAwesomeIcon 
          icon={isOpen ? faTimes : faCommentDots} 
          className="text-xl" 
        />
      </div>

      {/* Chat dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[800px] h-[500px] bg-white rounded-lg shadow-2xl flex overflow-hidden z-50 border border-gray-200">
          {/* Contact list (left column) */}
          <div className="w-1/4 border-r border-gray-200 bg-gray-50">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-bold text-gray-700">Conversations</h3>
            </div>
            <div className="overflow-y-auto h-[calc(500px-48px)]">
              {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${activeContact === contact.id ? 'bg-gray-100' : ''}`}
                  onClick={() => handleContactSelect(contact.id)}
                >
                  <div className="relative">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover mr-3" 
                    />
                    {contact.unread > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-xs text-gray-500">
                      {conversations[contact.id]?.[conversations[contact.id].length - 1]?.text.substring(0, 20)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area (right column) */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            {activeContact ? (
              <>
                <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center">
                  <img 
                    src={contacts.find(c => c.id === activeContact)?.avatar} 
                    alt="Contact"
                    className="w-8 h-8 rounded-full object-cover mr-2" 
                  />
                  <h3 className="font-bold text-gray-700">
                    {contacts.find(c => c.id === activeContact)?.name}
                  </h3>
                </div>

                {/* Messages */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  {conversations[activeContact]?.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender === 'me' 
                            ? 'bg-[#FFA50B] text-white rounded-br-none' 
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-gray-100' : 'text-gray-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <form 
                  className="p-3 border-t border-gray-200 flex"
                  onSubmit={handleSendMessage}
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FFA50B]"
                    placeholder="Type your message..."
                  />
                  <button 
                    type="submit"
                    className="bg-[#FFA50B] text-white px-4 rounded-r-lg hover:bg-[#e89400]"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FontAwesomeIcon icon={faCommentDots} className="text-6xl mb-4" />
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;