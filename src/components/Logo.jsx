const Logo = ({ size = "md", showBackground = true }) => {
  const sizes = {
    sm: {
      container: "p-2",
      title: "text-sm",
      pornic: "text-[8px]",
    },
    md: {
      container: "p-3",
      title: "text-lg md:text-xl",
      pornic: "text-[10px]",
    },
    lg: {
      container: "p-4 md:p-6",
      title: "text-2xl md:text-4xl",
      pornic: "text-xs md:text-sm",
    },
    xl: {
      container: "p-6 md:p-8",
      title: "text-3xl md:text-5xl",
      pornic: "text-sm md:text-base",
    },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div
      className={`${showBackground ? "bg-[#1e2d3d]" : ""} ${s.container} rounded-lg inline-block`}
    >
      <div
        className="text-center font-bold tracking-wide"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className={`text-[#e8a838] ${s.title} leading-tight`}>
          LES PETITS
        </div>
        <div className={`text-[#e8a838] ${s.title} leading-tight`}>
          BISCUITS
        </div>
        <div className={`text-[#e8a838] ${s.pornic} tracking-widest mt-1`}>
          • PORNIC •
        </div>
      </div>
    </div>
  );
};

export default Logo;
