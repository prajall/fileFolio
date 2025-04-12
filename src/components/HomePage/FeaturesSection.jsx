import { motion } from "framer-motion";
import { Upload, LinkIcon, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../Container";

const FeaturesSection = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      id: "share-instantly",
      title: "Share Instantly",
      description:
        "Upload and share your files and code snippets with just a few clicks. No account required, no complicated setup. Just drag, drop, and share.",
      icon: <Upload className="w-10 h-10" />,
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
      image: "/placeholder.svg?height=300&width=400",
      imageAlt: "Instant file sharing illustration",
    },
    {
      id: "custom-url",
      title: "Custom URL",
      description:
        "Create memorable, easy-to-share links with custom paths. Make your shared content more accessible with personalized URLs that are easy to remember.",
      icon: <LinkIcon className="w-10 h-10" />,
      color: "bg-gradient-to-br from-purple-500 to-slate-400",
      image: "/placeholder.svg?height=300&width=400",
      imageAlt: "Custom URL illustration",
    },
    {
      id: "private-folio",
      title: "Private Folio",
      description:
        "Secure your shared files with password protection. Filefolio lets you control access to private content with expiration dates and custom links.",
      icon: <Lock className="w-10 h-10" />,
      color: "bg-gradient-to-br from-amber-500 to-orange-400",
      image: "/placeholder.svg?height=300&width=400",
      imageAlt: "Private folio security illustration",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <Container>
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Powerful Features, Simple Experience
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Everything you need to share your content efficiently, securely,
              and on your terms.
            </motion.p>
          </div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                variants={itemVariants}
              >
                <div className="p-6">
                  <div
                    className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-6`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  {/* <Link
                    href={`#${feature.id}`}
                    className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-800"
                  >
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link> */}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Choose Filefolio for File Sharing?
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Instantly upload and share files, images, or code snippets without
              creating an account or installing software.
            </motion.p>
          </div>
        </Container>
      </div>
      {/* <p class="text-sm text-center mt-10">
        Filefolio is the simplest way to share files, images, and code online.
        With no sign-up required, you can upload and share instantly using
        custom links. Whether you're sending code snippets, design mockups, or
        documents, Filefolio gives you a fast, secure, and seamless experience.
      </p> */}
    </section>
  );
};

export default FeaturesSection;
