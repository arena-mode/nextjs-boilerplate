<div className="relative w-full overflow-x-auto">
  <nav className="flex items-center space-x-1 py-3 px-2">
    {[
      { name: 'Home', path: '/' },
      { name: 'Live Stream Alerts', path: '/live-stream-alerts' },
      { name: 'Crypto Market', path: '/crypto-market' },
      { name: 'Videos', path: '/videos' },
      { name: 'Posts', path: '/posts' },
      { name: 'Wallet Alerts', path: '/wallet-alerts' },
      { name: 'Shorting', path: '/shorting' },
      { name: 'CB Course', path: '/cb-course' },
    ].map((tab) => {
      const isActive = pathname === tab.path;
      return (
        
          key={tab.path}
          href={tab.path}
          className={`relative px-4 py-2 whitespace-nowrap text-sm font-medium transition-colors ${
            isActive
              ? 'text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab.name}
          {isActive && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
          )}
        </a>
      );
    })}
  </nav>
  <div className="absolute bottom-0 w-full h-px bg-gray-800" />
</div>
