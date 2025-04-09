import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  ArrowRight,
  Bookmark,
  Check,
  FileText,
  MessageSquare,
  Play,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-yellow-500/20 bg-black/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">ReviewSnap</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-yellow-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-yellow-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-yellow-400 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-yellow-400 transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-yellow-400 transition-colors"
            >
              Log in
            </Link>
            <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Video */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-30"
              poster="/placeholder.svg?height=1080&width=1920"
            >
              <source
                src={`${process.env.NEXT_PUBLIC_HERO_VIDEO}`}
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black">
            </div>
          </div>

          <div className="container relative z-10 py-24 md:py-32 lg:py-40">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
                  Collect feedback that matters
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Transform <span className="text-yellow-400">Reviews</span>
                  {" "}
                  Into Business Growth
                </h1>
                <p className="text-lg text-gray-300 md:text-xl">
                  Collect, analyze, and leverage customer feedback to improve
                  your products and services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    Start for free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-500/50 bg-white text-black hover:text-white hover:bg-yellow-500/10"
                  >
                    <Play className="mr-2 h-4 w-4" /> Watch demo
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Check className="h-4 w-4 text-yellow-400" />{" "}
                  No credit card required
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-300 opacity-70 blur">
                </div>
                <div className="relative rounded-xl overflow-hidden border border-yellow-500/20 ">
                  <Image
                    src="/about-banner.jpg"
                    width={600}
                    height={400}
                    alt="ReviewSnap dashboard preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        {
          /* <section className="border-y border-yellow-500/20 bg-black/80 py-10">
          <div className="container">
            <p className="text-center text-sm font-medium text-gray-400 mb-6">
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <img
                    src={`/placeholder.svg?height=40&width=120&text=BRAND${
                      i + 1
                    }`}
                    alt={`Brand ${i + 1}`}
                    className="h-8 md:h-10 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section> */
        }

        {/* Features Section */}
        <section id="features" className="py-20 bg-black">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
                Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Everything you need to collect{" "}
                <span className="text-yellow-400">valuable feedback</span>
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Our platform provides all the tools you need to gather, analyze,
                and act on customer reviews.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <MessageSquare className="h-10 w-10 text-yellow-400" />,
                  title: "Review Collection",
                  description:
                    "Collect customer reviews with customizable forms to gather valuable feedback.",
                },
                {
                  icon: <FileText className="h-10 w-10 text-yellow-400" />,
                  title: "Customizable Templates",
                  description:
                    "Create branded review forms with your own questions to capture the feedback you need.",
                },
                {
                  icon: <Bookmark className="h-10 w-10 text-yellow-400" />,
                  title: "Bookmark System",
                  description:
                    "Save important reviews for later reference and follow-up actions.",
                },
                {
                  icon: <Star className="h-10 w-10 text-yellow-400" />,
                  title: "Review Management",
                  description:
                    "Manage all your customer reviews in one convenient dashboard.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-black border border-yellow-500/20 hover:border-yellow-500/50 transition-colors"
                >
                  <CardHeader className="flex gap-2 items-center">
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle className="text-xl text-yellow-400">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-20 bg-gradient-to-b from-black to-yellow-950/30"
        >
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
                Pricing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Simple, transparent{" "}
                <span className="text-yellow-400">pricing</span>
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Choose the plan that's right for your business. All plans
                include a 14-day free trial.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "Free",
                  description:
                    "Perfect for small businesses just getting started with reviews.",
                  features: [
                    "Up to 2 templates ",
                    "Up to 100 text reviews/template",
                    "Up to 2 video reviews/template",
                    "Basic Wall of Love embedding",
                  ],
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "$59/month",
                  description:
                    "For growing businesses that need more advanced features.",
                  features: [
                    "Up to 10 templates ",
                    "Up to 100 text reviews/template",
                    "Up to 10 video reviews/template",
                    "Multiple Predefined styles for  Wall of Love embedding",
                    "Customer Personalized support",
                  ],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "$100/month",
                  description:
                    "For large businesses with high volume review needs.",
                  features: [
                    "Unlimited templates",
                    "Unlimited video and text reviews ",
                    "24/7 phone & email support",
                    "Everything in Pro + Custom design for wall of love",
                  ],
                  popular: false,
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={`bg-black border ${
                    plan.popular ? "border-yellow-400" : "border-yellow-500/20"
                  } relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl text-white text-center">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-white">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-400"></span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-yellow-400 text-black hover:bg-yellow-500"
                          : "bg-black border border-yellow-500 hover:bg-yellow-500/10"
                      }`}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Review Wall / Testimonials */}
        <section id="testimonials" className="py-20 bg-black">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                What our <span className="text-yellow-400">customers</span>{" "}
                are saying
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Don't just take our word for it. Here's what businesses like
                yours have achieved with ReviewSnap.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="bg-black border border-yellow-500/20">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-yellow-400 font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          Customer {i + 1}
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-400">
                          CEO, Company {i + 1}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 ${
                            j < 5 - (i % 2)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300">
                      "ReviewSnap has transformed how we collect and utilize
                      customer feedback. The insights we've gained have been
                      invaluable for our business growth."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                Read more success stories
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-black to-yellow-950/30">
          <div className="container">
            <div className="rounded-2xl border border-yellow-500/30 bg-black/50 p-8 md:p-12 lg:p-16 backdrop-blur-sm">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                    Ready to transform your{" "}
                    <span className="text-yellow-400">customer feedback</span>?
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Join thousands of businesses that use ReviewSnap to collect,
                    analyze, and leverage customer reviews for growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-yellow-500 text-black hover:bg-yellow-400"
                    >
                      Get started for free
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-yellow-500/50 text-white hover:bg-yellow-500/10"
                    >
                      Schedule a demo
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-300 opacity-30 blur-lg">
                  </div>
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="ReviewSnap dashboard"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-black">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
                FAQ
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Frequently Asked{" "}
                <span className="text-yellow-400">Questions</span>
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Everything you need to know about ReviewSnap. Can't find the
                answer you're looking for? Contact our support team.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {[
                {
                  question: "How does ReviewSnap collect reviews?",
                  answer:
                    "ReviewSnap offers multiple collection methods including email invitations, SMS requests, QR codes, and website widgets. You can choose the methods that work best for your business.",
                },
                {
                  question: "Can I respond to reviews from the platform?",
                  answer:
                    "Yes! ReviewSnap allows you to respond to reviews directly from the dashboard. You can also set up templates for common responses to save time.",
                },
                {
                  question: "How does the spam protection work?",
                  answer:
                    "Our AI-powered system analyzes reviews for patterns that indicate spam or fake reviews. It checks IP addresses, language patterns, and submission timing to filter out suspicious reviews.",
                },
                {
                  question:
                    "Can I integrate ReviewSnap with my existing systems?",
                  answer:
                    "Absolutely. ReviewSnap offers integrations with popular CRMs, e-commerce platforms, and marketing tools. We also provide an API for custom integrations.",
                },
                {
                  question:
                    "Is there a limit to how many reviews I can collect?",
                  answer:
                    "It depends on your plan. Our Starter plan includes up to 100 reviews per month, Professional up to 1,000, and Enterprise offers unlimited reviews.",
                },
                {
                  question: "How customizable are the review widgets?",
                  answer:
                    "Very customizable! You can adjust colors, layouts, and display options to match your brand. You can also filter which reviews to display based on rating or content.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="bg-black border border-yellow-500/20"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 bg-black py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-6 w-6 text-yellow-400" />
                <span className="text-xl font-bold">ReviewSnap</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                The complete platform for collecting and leveraging customer
                reviews to grow your business.
              </p>
              {
                /* <div className="flex gap-4">
                  {["twitter", "facebook", "instagram", "linkedin"].map((
                    social,
                  ) => (
                    <Link
                      key={social}
                      href="#"
                      className="text-gray-400 hover:text-yellow-400"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <span className="text-xs">
                          {social[0]?.toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div> */
              }
            </div>

            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Pricing",
                  "Integrations",
                  "Changelog",
                  "Documentation",
                ],
              },
              {
                title: "Company",
                links: ["About us", "Careers", "Blog", "Press", "Contact"],
              },
              {
                title: "Resources",
                links: [
                  "Community",
                  "Help Center",
                  "Support",
                  "API",
                  "Partners",
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-medium mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href="#"
                        className="text-sm text-gray-400 hover:text-yellow-400"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-yellow-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} ReviewSnap. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-yellow-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-yellow-400"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-yellow-400"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
