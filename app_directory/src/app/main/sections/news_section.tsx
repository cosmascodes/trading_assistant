export const NewsSection = () => {
  return (
    <div className="min-h-screen text-slate-400 p-6 bg-gray-900/90 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Latest News Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-300">Latest Crypto News</h2>
            </div>
            
            <div className="space-y-4">
              <LatestNewsItem
                category="Bitcoin News"
                categoryColor="bg-orange-500"
                title="Bitcoin-Focused Vinanz Triples Fundraising Target With £3.6M Raise to Fuel BTC Strategy"
                time="2 hours ago"
              />
              <LatestNewsItem
                category="Blockchain News"
                categoryColor="bg-blue-500"
                title="Infini Crypto Card Officially Closes, Pivots to Financial Management"
                time="3 hours ago"
              />
              <LatestNewsItem
                category="Altcoin News"
                categoryColor="bg-purple-500"
                title="XRP Ledger Daily Users Jump 7x to 295K — Is a Price Shift Coming?"
                time="3 hours ago"
              />
              <LatestNewsItem
                category="Blockchain News"
                categoryColor="bg-blue-500"
                title="JPMorgan Files New Crypto Trademark — Is a Bank-Backed Stablecoin Coming?"
                time="5 hours ago"
              />
              <LatestNewsItem
                category="Market News"
                categoryColor="bg-green-500"
                title="Genius Group boosts Bitcoin holdings by 52% after court lifts crypto ban"
                time="6 hours ago"
              />
            </div>
          </div>

          {/* Deep Dives Column */}
          <div>
            <h2 className="text-sm font-bold text-slate-300 mb-6 lowercase">deep dives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DeepDiveCard
                image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&crop=center"
                category="OPINION"
                categoryColor="bg-pink-500"
                title="Solana network extensions will redefine blockchain scaling | Opinion"
                tags={["SOL", "ETH"]}
                time="1 hour ago"
              />
              <DeepDiveCard
                image="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop&crop=center"
                category="ANALYSIS"
                categoryColor="bg-orange-500"
                title="Oil, inflation, and Bitcoin are now locked in the same trade"
                tags={["BTC", "ETH"]}
                time="18 hours ago"
              />
              <DeepDiveCard
                image="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&crop=center"
                category="INTERVIEW"
                categoryColor="bg-yellow-500"
                title="Interview | Tokenized RWAs could hide the next financial crisis, warns MEXC exec"
                tags={[]}
                time="21 hours ago"
              />
              <DeepDiveCard
                image="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop&crop=center"
                category="ANALYSIS"
                categoryColor="bg-purple-500"
                title="Warning to builders: L2s are leaking value, L1 appchains are the smarter bet | Opinion"
                tags={["ETH"]}
                time="1 day ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Latest News Item Component
interface LatestNewsItemProps {
  category: string;
  categoryColor: string;
  title: string;
  time: string;
}

const LatestNewsItem = ({ category, categoryColor, title, time }: LatestNewsItemProps) => (
  <div className="border-l-4 border-gray-800 pl-4 py-3 hover:border-blue-500 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-xs font-medium px-2 py-1 ${categoryColor} text-white rounded`}>
        {category}
      </span>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
    <h3 className="text-sm font-medium text-white leading-tight hover:text-blue-400 transition-colors cursor-pointer">
      {title}
    </h3>
  </div>
);

// Deep Dive Card Component
interface DeepDiveCardProps {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  tags: string[];
  time: string;
}

const DeepDiveCard = ({ image, category, categoryColor, title, tags, time }: DeepDiveCardProps) => (
  <div className="overflow-hidden transition-colors cursor-pointer group">
    <div className="relative rounded-lg overflow-hidden">
      <img 
        src={image} 
        alt="" 
        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 left-3">
        <span className={`text-xs font-bold px-2 py-1 ${categoryColor} text-white rounded uppercase`}>
          {category}
        </span>
      </div>
    </div>
    <div className="py-4">
      <h3 className="text-sm font-semibold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  </div>
);