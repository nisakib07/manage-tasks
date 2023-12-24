const Users = () => {
  const userTypes = [
    {
      title: "Developers",
      description:
        "Enhance your coding skills and stay updated with the latest technologies.",
    },
    {
      title: "Corporate Professionals",
      description:
        "Access valuable resources to improve productivity and professional development.",
    },
    {
      title: "Bankers",
      description:
        "Stay informed about financial trends and tools that can streamline your work.",
    },
    // Add more user types as needed
  ];
  return (
    <div>
      <h1 className="text-center text-2xl my-6 font-bold">
        Who Uses Our Website?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-lg mx-auto">
        {userTypes.map((user, idx) => (
          <div key={idx} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{user.title}</h2>
              <p>{user.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
