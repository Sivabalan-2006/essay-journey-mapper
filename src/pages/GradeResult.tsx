import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router-dom";
import { BookOpen, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { useState } from "react";

const GradeResult = () => {
  const { essayId } = useParams();
  const [hoveredText, setHoveredText] = useState<string | null>(null);

  // Mock result data - in a real app this would come from API
  const result = {
    overallGrade: "A-",
    overallScore: 88,
    topic: "The Impact of Climate Change on Modern Society",
    criteria: [
      { name: "Content & Ideas", score: 92, feedback: "Excellent depth of analysis with well-researched examples and clear thesis statement." },
      { name: "Structure & Organization", score: 85, feedback: "Good logical flow with clear paragraphs. Could benefit from stronger transitions." },
      { name: "Grammar & Mechanics", score: 90, feedback: "Minor punctuation issues but overall excellent command of language." },
      { name: "Style & Voice", score: 82, feedback: "Engaging writing style. Consider varying sentence structure for better flow." },
      { name: "Evidence & Support", score: 95, feedback: "Outstanding use of credible sources and compelling examples throughout." }
    ],
    essayText: `Climate change represents one of the most pressing challenges of our time, fundamentally altering the way modern society must approach development, energy consumption, and environmental stewardship. This phenomenon, driven primarily by human activities since the Industrial Revolution, has created a complex web of environmental, economic, and social consequences that demand immediate and sustained action.

The scientific evidence for anthropogenic climate change is overwhelming. Global temperatures have risen by approximately 1.1°C since pre-industrial times, with the last decade marking the warmest on record. This warming trend has accelerated the melting of polar ice caps, leading to rising sea levels that threaten coastal communities worldwide. Furthermore, changing precipitation patterns have resulted in more frequent extreme weather events, from devastating hurricanes to prolonged droughts.

The economic implications of climate change are equally profound. Traditional industries, particularly those dependent on stable weather patterns like agriculture and tourism, face unprecedented challenges. However, this crisis has also catalyzed innovation in renewable energy technologies, creating new economic opportunities and job markets. The transition to a green economy represents both a challenge and an opportunity for modern society.

Social justice issues are inextricably linked to climate change impacts. Vulnerable populations, including low-income communities and developing nations, bear a disproportionate burden of climate consequences despite contributing least to the problem. This inequity demands that climate solutions incorporate principles of environmental justice and global cooperation.

In conclusion, addressing climate change requires a fundamental transformation of how modern society operates, from energy systems to economic models to social structures, making it not just an environmental issue but a comprehensive challenge for human civilization.`,
    highlights: {
      "scientific evidence for anthropogenic climate change is overwhelming": "Strong factual foundation",
      "This inequity demands that climate solutions": "Excellent connection to social justice",
      "fundamental transformation of how modern society operates": "Compelling conclusion"
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-success text-success-foreground";
    if (grade.startsWith("B")) return "bg-primary text-primary-foreground";
    if (grade.startsWith("C")) return "bg-warning text-warning-foreground";
    return "bg-muted text-muted-foreground";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const renderEssayWithHighlights = (text: string) => {
    let renderedText = text;
    
    Object.entries(result.highlights).forEach(([phrase, feedback]) => {
      const highlightClass = hoveredText === phrase 
        ? "bg-primary/20 border-b-2 border-primary cursor-pointer" 
        : "bg-primary/10 cursor-pointer hover:bg-primary/20 transition-smooth";
        
      renderedText = renderedText.replace(
        phrase,
        `<span class="${highlightClass}" data-feedback="${feedback}">${phrase}</span>`
      );
    });
    
    return renderedText;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{result.topic}</h1>
          <div className="flex items-center gap-4">
            <Badge className={`text-2xl px-4 py-2 ${getGradeColor(result.overallGrade)}`}>
              {result.overallGrade}
            </Badge>
            <div>
              <p className="text-2xl font-bold">{result.overallScore}/100</p>
              <p className="text-muted-foreground">Overall Score</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Detailed Feedback */}
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.criteria.map((criterion) => (
                  <div key={criterion.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{criterion.name}</h3>
                      <span className={`font-bold ${getScoreColor(criterion.score)}`}>
                        {criterion.score}/100
                      </span>
                    </div>
                    <Progress value={criterion.score} className="h-2" />
                    <p className="text-sm text-muted-foreground">{criterion.feedback}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/grade/new" className="flex-1">
                <Button className="w-full shadow-glow transition-bounce">
                  <Plus className="h-4 w-4 mr-2" />
                  Grade Another Essay
                </Button>
              </Link>
              <Button variant="outline" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regrade This Essay
              </Button>
            </div>
          </div>

          {/* Original Essay */}
          <div>
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Your Essay
                  <Badge variant="secondary" className="ml-auto">
                    Interactive Feedback
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderEssayWithHighlights(result.essayText) }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.tagName === 'SPAN' && target.dataset.feedback) {
                      setHoveredText(target.textContent);
                    }
                  }}
                  onMouseOut={() => setHoveredText(null)}
                />
                
                {hoveredText && (
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      💡 {result.highlights[hoveredText]}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    💡 Hover over highlighted text to see specific feedback
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradeResult;