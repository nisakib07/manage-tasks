const Home = () => {
  return (
    <div className="min-h-screen">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/QD6S6cm/banner.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <button className="btn bg-zinc-700 text-white border-none hover:bg-zinc-600">{`Let's Explore`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
