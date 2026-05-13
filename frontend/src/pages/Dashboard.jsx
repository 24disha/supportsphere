import { useState, useEffect } from "react";

import {
  FaTicketAlt,
  FaRobot,
  FaChartBar,
  FaPaperPlane,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  // Ticket States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tickets, setTickets] = useState(() => {

    return JSON.parse(
      localStorage.getItem("tickets")
    ) || [];

  });

  // Search + Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Chat States
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState(() => {

    return JSON.parse(
      localStorage.getItem("chat")
    ) || [
      {
        sender: "AI",
        text: "Hello 👋 Welcome to SupportSphere AI Support.",
      },
    ];

  });

  // Save Tickets
  useEffect(() => {

    localStorage.setItem(
      "tickets",
      JSON.stringify(tickets)
    );

  }, [tickets]);

  // Save Chat
  useEffect(() => {

    localStorage.setItem(
      "chat",
      JSON.stringify(chat)
    );

  }, [chat]);

  // Live Clock
  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // Create Ticket
  const createTicket = () => {

    if (!title || !description) {

      alert("Please fill all fields");
      return;

    }

    let priority = "Low";

    if (
      title.toLowerCase().includes("payment") ||
      description.toLowerCase().includes("urgent")
    ) {

      priority = "High";

    }

    else if (
      title.toLowerCase().includes("bug") ||
      description.toLowerCase().includes("error")
    ) {

      priority = "Medium";

    }

    const newTicket = {

      id: Date.now(),
      title,
      description,
      status: "Open",
      priority,

    };

    setTickets([...tickets, newTicket]);

    toast.success("Ticket Created Successfully 🚀");

    setTitle("");
    setDescription("");

  };

  // Delete Ticket
  const deleteTicket = (id) => {
    

    setTickets(
      tickets.filter(
        (ticket) => ticket.id !== id
      )
    );

    toast.error("Ticket Deleted");

  };

  // Update Status
  const updateStatus = (id) => {

    setTickets(

      tickets.map((ticket) => {

        if (ticket.id === id) {

          let nextStatus = "Open";

          if (ticket.status === "Open") {

            nextStatus = "In Progress";

          }

          else if (
            ticket.status === "In Progress"
          ) {

            nextStatus = "Resolved";

          }

          return {
            ...ticket,
            status: nextStatus,
          };

        }

        return ticket;

      })

    ); 

    toast.info("Ticket Status Updated");

  };

  

  // Filter Tickets
  const filteredTickets = tickets.filter(
    (ticket) => {

      const matchesSearch =
        ticket.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : ticket.priority === filter;

      return matchesSearch && matchesFilter;

    }
  );

  // Analytics
  const totalTickets = tickets.length;

  const resolvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Resolved"
    ).length;

  const pendingTickets =
    tickets.filter(
      (ticket) =>
        ticket.status !== "Resolved"
    ).length;

  const highPriorityTickets =
    tickets.filter(
      (ticket) =>
        ticket.priority === "High"
    ).length;

  // Chart Data
  const chartData = [

    {
      name: "Resolved",
      value: resolvedTickets,
    },

    {
      name: "Pending",
      value: pendingTickets,
    },

    {
      name: "High Priority",
      value: highPriorityTickets,
    },

  ];

  // Chart Colors
  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444",
  ];

  // AI Chat
  const sendMessage = () => {

    if (!message) return;

    const userMessage = {
      sender: "User",
      text: message,
    };

    setChat((prev) => [
      ...prev,
      userMessage,
    ]);

    const userQuery =
      message.toLowerCase();

    setMessage("");

    setTimeout(() => {

      let aiReply =
        "Thank you for contacting SupportSphere. Our support team will assist you shortly.";

      if (
        userQuery.includes("payment")
      ) {

        aiReply =
          "Please verify your payment method and transaction ID.";

      }

      else if (
        userQuery.includes("login")
      ) {

        aiReply =
          "Try resetting your password or clearing browser cache.";

      }

      else if (
        userQuery.includes("bug")
      ) {

        aiReply =
          "Our technical team is working on resolving this bug.";

      }

      else if (
        userQuery.includes("network")
      ) {

        aiReply =
          "Please check your internet connection.";

      }

      else if (
        userQuery.includes("ticket")
      ) {

        aiReply =
          "Your support ticket has been generated successfully.";

      }

      const aiMessage = {
        sender: "AI",
        text: aiReply,
      };

      setChat((prev) => [
        ...prev,
        aiMessage,
      ]);

    }, 1000);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/10 p-6 shadow-2xl flex flex-col justify-between">

        <div>

          <h1 className="text-3xl font-bold text-cyan-400 mb-10">
            SupportSphere
          </h1>

          <ul className="space-y-6 text-lg">

  <li
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
    className="hover:text-cyan-400 cursor-pointer"
  >
    Dashboard
  </li>

  <li
    onClick={() =>
      window.scrollTo({
        top: 900,
        behavior: "smooth",
      })
    }
    className="hover:text-cyan-400 cursor-pointer"
  >
    Tickets
  </li>

  <li
    onClick={() =>
      window.scrollTo({
        top: 2200,
        behavior: "smooth",
      })
    }
    className="hover:text-cyan-400 cursor-pointer"
  >
    AI Support
  </li>

  <li
    onClick={() =>
      window.scrollTo({
        top: 1400,
        behavior: "smooth",
      })
    }
    className="hover:text-cyan-400 cursor-pointer"
  >
    Analytics
  </li>

</ul>

        </div>

        {/* Logout */}
        <button
          onClick={() => {

            localStorage.removeItem(
              "isLoggedIn"
            );

            navigate("/");

          }}
          className="bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>

      {/* Main */}
      <div className="flex-1 p-10 overflow-y-auto">

        {/* Top Navbar */}
        
            

  <div className="flex justify-between items-center mb-10 bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-3xl shadow-xl">

  <div>

    <h2 className="text-2xl font-bold">
      Welcome Back 👋
    </h2>

    <p className="text-gray-300 mt-1">
      {currentTime.toLocaleDateString()} |{" "}
      {currentTime.toLocaleTimeString()}
    </p>

  </div>

  <div className="flex items-center gap-6">

    {/* Notification */}
    <div
      className="relative flex items-center justify-center cursor-pointer"
      onClick={() =>
        alert("🔔 3 New Support Notifications")
      }
    >

      <FaBell className="text-3xl text-yellow-400 hover:scale-110 transition-all" />

      <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
        3
      </span>

    </div>

    {/* Profile */}
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={() =>
        alert(
          "👤 User Profile\n\nName: Demo User\nRole: Admin"
        )
      }
    >

      <FaUserCircle className="text-5xl text-cyan-400 hover:scale-110 transition-all" />

    </div>

  </div>

</div>

    

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-10"
        >
          AI Powered Support Dashboard 🚀
        </motion.h1>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl"
          >

            <FaTicketAlt className="text-5xl text-cyan-400 mb-4" />

            <h2 className="text-2xl font-bold">
              {tickets.length} Tickets
            </h2>

            <p className="text-gray-400 mt-2">
              Active support tickets
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl"
          >

            <FaRobot className="text-5xl text-green-400 mb-4" />

            <h2 className="text-2xl font-bold">
              AI Assistant
            </h2>

            <p className="text-gray-400 mt-2">
              Smart issue solving
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-xl"
          >

            <FaChartBar className="text-5xl text-pink-400 mb-4" />

            <h2 className="text-2xl font-bold">
              Analytics
            </h2>

            <p className="text-gray-400 mt-2">
              Ticket insights
            </p>

          </motion.div>

        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold text-cyan-400">
              Total Tickets
            </h2>

            <p className="text-4xl font-bold mt-4">
              {totalTickets}
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold text-green-400">
              Resolved
            </h2>

            <p className="text-4xl font-bold mt-4">
              {resolvedTickets}
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold text-yellow-400">
              Pending
            </h2>

            <p className="text-4xl font-bold mt-4">
              {pendingTickets}
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-bold text-red-400">
              High Priority
            </h2>

            <p className="text-4xl font-bold mt-4">
              {highPriorityTickets}
            </p>

          </div>

        </div>

       {/* Pie Chart */}
<div className="bg-white/10 backdrop-blur-lg border border-white/10 mt-12 p-8 rounded-3xl shadow-xl">

  <h2 className="text-3xl font-bold mb-6">
    Ticket Analytics Chart 📊
  </h2>

  <div className="w-full h-[400px]">

    <ResponsiveContainer>

      <PieChart>

        <Pie
          data={
            chartData.some(
              (item) => item.value > 0
            )
              ? chartData
              : [
                  {
                    name: "No Data",
                    value: 1,
                  },
                ]
          }
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >

          {chartData.map((entry, index) => (

            <Cell
              key={`cell-${index}`}
              fill={
                COLORS[index % COLORS.length]
              }
            />

          ))}

        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

        {/* Ticket Form */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 mt-12 p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            Generate Ticket 🎫
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Issue Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 outline-none"
            />

            <textarea
              placeholder="Describe your issue..."
              rows="5"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-gray-700 outline-none"
            />

            <button
              onClick={createTicket}
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold"
            >
              Create Ticket
            </button>

          </div>

        </div>

        {/* Tickets */}
        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Generated Tickets 🎫
          </h2>

          {/* Search + Filter */}
          <div className="flex gap-4 mb-6">

            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 p-3 rounded-xl bg-[#0f172a] border border-gray-700"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="p-3 rounded-xl bg-[#0f172a] border border-gray-700"
            >

              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>

            </select>

          </div>

          {/* Empty State */}
          {filteredTickets.length === 0 ? (

            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-10 rounded-3xl text-center">

              <h2 className="text-3xl font-bold text-cyan-400">
                No Tickets Found 🚀
              </h2>

              <p className="text-gray-400 mt-4">
                Create your first support ticket
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredTickets.map((ticket) => (

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={ticket.id}
                  className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="text-2xl font-bold text-cyan-400">
                      {ticket.title}
                    </h3>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-bold
                      ${
                        ticket.priority === "High"
                          ? "bg-red-500"
                          : ticket.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {ticket.priority}
                    </span>

                  </div>

                  <p className="text-gray-300 mt-4">
                    {ticket.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center flex-wrap gap-3">

                    <span className="text-green-400 font-bold">
                      {ticket.status}
                    </span>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          updateStatus(ticket.id)
                        }
                        className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl"
                      >
                        Update Status
                      </button>

                      <button
                        onClick={() =>
                          deleteTicket(ticket.id)
                        }
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </div>

                {/* AI Chatbot */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 mt-12 p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            AI Support Chatbot 🤖
          </h2>

          <div className="bg-[#0f172a] h-80 overflow-y-auto p-5 rounded-2xl space-y-4">

            {chat.map((msg, index) => (

              <div
                key={index}
                className={`p-4 rounded-2xl max-w-[80%]
                ${
                  msg.sender === "User"
                    ? "bg-cyan-500 ml-auto"
                    : "bg-gray-700"
                }`}
              >

                <p className="font-bold mb-1">
                  {msg.sender}
                </p>

                <p>{msg.text}</p>

              </div>

            ))}

          </div>

          <div className="flex gap-4 mt-6">

            
              <input
  type="text"
  placeholder="Ask AI support..."
  value={message}
  onChange={(e) =>
    setMessage(e.target.value)
  }
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}
  className="flex-1 p-4 rounded-xl bg-[#0f172a] border border-gray-700"
/>
            <button
              onClick={sendMessage}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 rounded-xl"
            >
              <FaPaperPlane />
            </button>

          </div>

        </div>

       

      </div>

    </div>

  );

}

export default Dashboard;