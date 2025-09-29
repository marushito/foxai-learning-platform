import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Menu, Lock } from 'lucide-react';

const FoxAILearningPlatform = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'こんにちは!FoxAIです。学習のサポートをさせていただきます。何でもお気軽にお聞きください!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      if (text.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText(text);
        setPopupPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `「${inputMessage}」についてお答えします。これは学習内容に関連する重要な概念ですね。具体的にどの部分について詳しく知りたいですか?`
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleAskFoxAI = () => {
    setShowPopup(false);
    setIsChatOpen(true);
    setInputMessage(`「${selectedText}」について教えてください`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-300 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SL</span>
            </div>
            <span className="text-xl font-bold text-white">SLスクナ</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-cyan-400 text-sm hover:text-cyan-300">企業のお持ちこちら</a>
          <button className="px-6 py-2 border border-gray-600 rounded-full text-sm hover:bg-gray-700">
            ログイン
          </button>
          <button className="px-6 py-2 bg-cyan-500 rounded-full text-sm hover:bg-cyan-600">
            無料会員登録
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-80 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto`} style={{ height: 'calc(100vh - 60px)' }}>
          <div className="mb-6">
            <button className="text-cyan-400 hover:text-cyan-300 mb-4 flex items-center gap-2">
              ← レッスンへ戻る
            </button>

            <h3 className="text-sm text-gray-400 mb-3">もう一度視聴する</h3>
            <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
              <div className="aspect-video bg-gray-700 flex items-center justify-center relative">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm mb-2">学習</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-cyan-400 font-bold">1</span>
              </div>
              <div className="mt-2 text-xs text-cyan-400">
                1 Webページを作る言語の1つ、すべてのWebページにはHTMLが使われている!
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <Lock className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-bold mb-2">会員限定コンテンツ</h3>
            <p className="text-sm text-gray-400 mb-4">
              学習した内容を確認で実践!<br/>
              無料会員登録で全ての課題を受講できます。
            </p>
            <button className="px-6 py-2 bg-cyan-500 rounded-full text-sm hover:bg-cyan-600 w-full">
              無料会員登録
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-400 mb-6">
              HTML基礎コース / 基礎知識と手順 / HTMLについて / Webページを作る言語の1つ、すべてのWebページにはHTMLが使われている!
            </div>

            <h1 className="text-2xl font-bold mb-8 text-cyan-400">
              🖊️ Webページを作る言語の1つ、すべてのWebページにはHTMLが使われている!
            </h1>

            {/* Table of Contents */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-bold mb-4">目次</h2>
              <div className="space-y-2 text-sm">
                <div className="text-gray-300">01 HTMLとは？</div>
                <div className="text-gray-400">02 HTMLファイルの表示とソースコードの比較</div>
                <div className="text-gray-400">03 なぜ構造的な文書を作る必要があるのか？</div>
                <div className="text-gray-400">04 HTMLは構造、CSSはデザインという役割分担</div>
                <div className="text-gray-400">05 今回の学習まとめ</div>
              </div>
            </div>

            {/* Content Section */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-cyan-400">01 HTMLとは？</h2>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  HTML(エイチティーエムエル、HyperText Markup Language)とは、Webページを構成するために開発されたコンピュータ言語です。
                </p>

                <p>
                  日本語に直訳するとハイパーテキストをマークアップする言語という意味になります。
                </p>

                <p>
                  ハイパーテキストとは、Webサイトで見られる通常青色の下線が引いてあるテキストをマウスでクリックすることで別ページに遷移するハイパーリンクを埋め込むことができる機能などテキストのことを指します。
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Text Selection Popup */}
      {showPopup && (
        <div
          className="fixed bg-gray-800 border border-cyan-500 rounded-lg shadow-lg px-4 py-2 z-50 transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${popupPosition.x}px`, top: `${popupPosition.y}px` }}
        >
          <button
            onClick={handleAskFoxAI}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium whitespace-nowrap flex items-center gap-2"
          >
            <img src="/images/foxai-icon.png" alt="FoxAI" className="w-4 h-4 object-contain" />
            FoxAIに聞く
          </button>
        </div>
      )}

      {/* FoxAI Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center group overflow-hidden"
        >
          <span className="text-xs font-bold text-white mb-1 tracking-wider">FoxAI</span>
          <img
            src="/images/foxai-icon.png" alt="FoxAI"
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-800 rounded-lg shadow-2xl flex flex-col border border-gray-700">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">Fox</span>
              </div>
              <div>
                <h3 className="font-bold text-white">FoxAI</h3>
                <p className="text-xs text-orange-100">学習アシスタント</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="メッセージを入力..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg p-2"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Foxhound Logo */}
          <div className="px-4 pb-2 text-center">
            <p className="text-xs text-gray-500">Powered by foxhound株式会社</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoxAILearningPlatform;