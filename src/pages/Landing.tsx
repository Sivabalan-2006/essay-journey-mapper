import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Zap, BarChart3, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
            EssayGrader AI
          </span>
        </div>
        <Link to="/login">
          <Button variant="outline" className="transition-smooth">
            Login
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeInUp">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Get Instant,{" "}
              <span className="gradient-hero bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Feedback on Your Essays
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform your writing with comprehensive analysis, detailed feedback, 
              and actionable insights. Our AI evaluates content, structure, grammar, 
              and more to help you achieve academic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto shadow-glow transition-bounce">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="shadow-elegant rounded-2xl overflow-hidden">
              <img 
                src={heroImage} 
                alt="AI-powered essay grading platform" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose EssayGrader AI?
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive analysis that goes beyond simple grammar checking
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 shadow-card transition-smooth hover:shadow-elegant">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Instant Analysis</h3>
                <p className="text-muted-foreground">
                  Get comprehensive feedback in seconds, not days. Our AI processes 
                  your essay instantly with detailed insights.
                </p>
              </div>
            </Card>

            <Card className="p-8 shadow-card transition-smooth hover:shadow-elegant">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Detailed Scoring</h3>
                <p className="text-muted-foreground">
                  Multi-criteria evaluation covering content, structure, grammar, 
                  style, and academic standards with clear grades.
                </p>
              </div>
            </Card>

            <Card className="p-8 shadow-card transition-smooth hover:shadow-elegant">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-success flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Actionable Feedback</h3>
                <p className="text-muted-foreground">
                  Specific suggestions for improvement with examples and 
                  explanations to help you grow as a writer.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Improve Your Writing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students and professionals who trust EssayGrader AI
          </p>
          <Link to="/signup">
            <Button size="lg" className="shadow-glow transition-bounce">
              Start Grading Essays Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;