import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Navigation } from "@/components/Navigation";
import { Home } from "./Home";
import { CalendarPage } from "./CalendarPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "calendar">("home");

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        {/* Page Title for Mobile */}
        <div className="md:hidden mb-4">
          <h2 className="text-2xl font-bold font-dancing gradient-primary bg-clip-text text-transparent">
            {currentPage === "home" ? "Today's Tasks" : "Calendar View"}
          </h2>
        </div>
        
        {/* Navigation */}
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Page Content */}
      {currentPage === "home" ? <Home /> : <CalendarPage />}
    </Layout>
  );
};

export default Index;
