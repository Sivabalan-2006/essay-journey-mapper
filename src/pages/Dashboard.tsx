// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen, Plus, FileText, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client"; // Import supabase

// Define a type for the essay object for type safety
type Essay = {
  id: string;
  title: string;
  grade: string;
  created_at: string;
  score: number;
};

const Dashboard = () => {
  const [essayHistory, setEssayHistory] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not found");

        const { data, error } = await supabase
          .from('essays')
          .select('*')
          .eq('user_id', user.id); // Fetch only essays belonging to the current user

        if (error) throw error;
        
        // The date field in the mock was `date`, in the DB it is `created_at`
        // We map it here to match the existing component logic
        const formattedData = data.map(essay => ({ ...essay, date: essay.created_at }));
        setEssayHistory(formattedData || []);

      } catch (error) {
        console.error("Error fetching essay history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, []);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-success text-success-foreground";
    if (grade.startsWith("B")) return "bg-primary text-primary-foreground";
    if (grade.startsWith("C")) return "bg-warning text-warning-foreground";
    return "bg-muted text-muted-foreground";
  };
  
  if (loading) {
    return <div>Loading your dashboard...</div> // Or a proper skeleton loader
  }

  // The rest of your JSX remains the same as it was, it will now use the fetched data.
  // ...
  return (
    <div className="min-h-screen bg-background">
      {/* ... Header ... */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ... Hero Section ... */}
        {/* ... Stats Cards ... */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Essays
            </CardTitle>
          </CardHeader>
          <CardContent>
            {essayHistory.length > 0 ? (
              <div className="space-y-4">
                {essayHistory.map((essay) => (
                  <Link
                    key={essay.id}
                    to={`/grade/result/${essay.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-smooth group">
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-smooth">
                          {essay.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {new Date(essay.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge className={getGradeColor(essay.grade)}>
                            {essay.grade}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {essay.score}/100
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
             // ... No essays yet JSX ...
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
