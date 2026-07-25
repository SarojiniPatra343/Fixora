import "./ProviderHome.css";
import React from "react";


import {
  Briefcase,
  PlusCircle,
  ListChecks,
  UploadCloud,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ProviderHome() {

  const navigate = useNavigate();

  const cards = [
    {
      title: "Upload Information",
      description:
        "Add your professional details, skills, experience, and profile information.",
      icon: <UploadCloud size={32} />,
      path: "/provider/uploadInfo",
    },

    {
      title: "Create Sub Service",
      description:
        "Create and manage sub-services for customers with pricing and duration.",
      icon: <PlusCircle size={32} />,
      path: "/provider/createSubservice",
    },

    {
      title: "All Sub Services",
      description:
        "View all created sub-services, update details, and manage availability.",
      icon: <ListChecks size={32} />,
      path: "/provider/allSubService",
    },

    {
      title: "Manage Business",
      description:
        "Track your services, customer engagement, and provider performance.",
      icon: <Briefcase size={32} />,
      path: "/provider/providerHome",
    },
  ];

  return (
    <div className="providerHome">

      {/* TOP SECTION */}
      <div className="providerTop">
        <h1>Provider Dashboard</h1>
        <p>
          Welcome back! Manage your services, profile, and customer activities
          from one place.
        </p>
      </div>

      {/* CARDS */}
      <div className="providerCards">

        {cards.map((card, index) => (
          <div className="providerCard" key={index}>

            <div className="providerIcon">
              {card.icon}
            </div>

            <h2>{card.title}</h2>

            <p>{card.description}</p>

            <button
              className="providerBtn"
              onClick={() => navigate(card.path)}
            >
              Open
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProviderHome;