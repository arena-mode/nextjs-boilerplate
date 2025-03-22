const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/logo.png" 
        alt="Crypto Bellwether"
        width={32}
        height={32}
        style={{ borderRadius: '50%' }}
      />
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </div>
  );
};

export default Logo;
