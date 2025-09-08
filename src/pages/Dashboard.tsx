import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen, Plus, FileText, Clock, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Mock data for previously submitted essays
  const essayHistory = [
    {
      id: "1",
      title: "The Impact of Climate Change on Modern Society",
      grade: "A-",
      date: "2024-01-15",
      score: 88
    },
    {
      id: "2", 
      title: "Analyzing Shakespeare's Use of Metaphor in Hamlet",
      grade: "B+",
      date: "2024-01-10",
      score: 82
    },
    {
      id: "3",
      title: "The Economic Effects of Social Media on Business",
      grade: "A",
      date: "2024-01-05",
      score: 92
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-success text-success-foreground";
    if (grade.startsWith("B")) return "bg-primary text-primary-foreground";
    if (grade.startsWith("C")) return "bg-warning text-warning-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                EssayGrader AI
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Welcome back!</span>
              <Button variant="outline" size="sm">
                Account
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Essay Dashboard</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Track your progress and get instant feedback on your writing
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/grade/new">
              <Button size="lg" className="w-full sm:w-auto shadow-glow transition-bounce">
                <Plus className="h-5 w-5 mr-2" />
                Grade a New Essay
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Essays</p>
                  <p className="text-3xl font-bold">{essayHistory.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold">
                    {Math.round(essayHistory.reduce((acc, essay) => acc + essay.score, 0) / essayHistory.length)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold">{essayHistory.length}</p>
                </div>
                <Clock className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Essay History */}
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
                          Submitted on {new Date(essay.date).toLocaleDateString()}
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
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No essays yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by grading your first essay to see it here
                </p>
                <Link to="/grade/new">
                  <Button>Grade Your First Essay</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;