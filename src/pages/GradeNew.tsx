import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";

const GradeNew = () => {
  const [topic, setTopic] = useState("");
  const [essay, setEssay] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const navigate = useNavigate();

  const floatingWords = [
    "Excellence", "Analysis", "Structure", "Grammar", "Clarity", "Insight",
    "Creativity", "Logic", "Flow", "Evidence", "Style", "Precision"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGrading(true);
    
    // Simulate AI grading process
    setTimeout(() => {
      // For demo purposes, navigate to a mock result
      navigate("/grade/result/new");
    }, 3000);
  };

  if (isGrading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto shadow-elegant">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Sparkles className="h-12 w-12 text-primary mx-auto animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-2">AI is Analyzing Your Essay</h2>
            <p className="text-muted-foreground mb-6">
              Our advanced AI is carefully reviewing your work across multiple criteria...
            </p>
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground">Analyzing content and structure...</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Floating words animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {floatingWords.map((word, index) => (
            <div
              key={word}
              className={`absolute text-primary/20 font-medium text-lg select-none animate-float${
                index % 3 === 0 ? '' : index % 3 === 1 ? '-delayed' : '-slow'
              }`}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="border-b bg-card shadow-sm relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
                EssayGrader AI
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Floating Words Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingWords.map((word, index) => (
          <div
            key={word}
            className={`absolute text-primary/10 font-medium text-lg select-none animate-float${
              index % 3 === 0 ? '' : index % 3 === 1 ? '-delayed' : '-slow'
            }`}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Grade Your Essay</h1>
          <p className="text-xl text-muted-foreground">
            Submit your essay and get comprehensive AI-powered feedback in seconds
          </p>
        </div>

        <Card className="shadow-elegant max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Essay Submission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Essay Topic/Title</Label>
                <Input
                  id="topic"
                  placeholder="Enter your essay topic or title"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="essay">Your Essay</Label>
                <Textarea
                  id="essay"
                  placeholder="Paste your essay content here..."
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  className="min-h-[400px] resize-none"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Word count: {essay.trim().split(/\s+/).filter(word => word.length > 0).length} words
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="shadow-glow transition-bounce"
                  disabled={!topic.trim() || !essay.trim()}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Grade My Essay
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GradeNew;