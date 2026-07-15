import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../src/firebase";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { Edit3, Check, X, Sparkles, Loader2, Play, Power, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

// Absolute defaults for all copy throughout the website so the app is immediately fully functional.
export const DEFAULT_CONTENT: Record<string, string> = {
  // Hero section
  "hero.badge": "Trusted by 20+ Enterprises Worldwide",
  "hero.titleLine1": "Transform Your Business",
  "hero.titleLine2": "with Intelligent Automation",
  "hero.description": "We provide end-to-end automation services and bespoke digital software solutions designed to eliminate operational friction and drive measurable ROI for modern enterprises.",
  "hero.exploreBtn": "Explore Services",
  "hero.consultBtn": "Get a Consultation",
  "hero.stat1Value": "23+",
  "hero.stat1Label": "Automations Deployed",
  "hero.stat2Value": "95%",
  "hero.stat2Label": "Workflow Efficiency",
  "hero.stat3Value": "10+",
  "hero.stat3Label": "Domain Expertise",

  // CTA section
  "cta.title": "Ready to Automate Your Operations?",
  "cta.subtitle": "Join forward-thinking enterprises using TriSmart's custom-engineered intelligent agents and workflows to accelerate their business growth.",
  "cta.primaryBtn": "Initiate Consultation",
  "cta.secondaryBtn": "Download Portfolio Brochure",

  // Features section
  "features.sectionBadge": "INTELLIGENCE LAYER",
  "features.sectionTitle": "Custom Software Built for Enterprise Operations",
  "features.sectionDesc": "We engineer high-performance systems integrated with neural cognition and visual processing pipelines.",

  // Contact section
  "contact.badge": "GET IN TOUCH",
  "contact.title": "Let's Architect Your Automation",
  "contact.subtitle": "Submit your requirements below. Our solutions engineering team will analyze your workflows and deliver a tailored automation plan.",
  "contact.formNameLabel": "Full Name",
  "contact.formEmailLabel": "Business Email",
  "contact.formPhoneLabel": "Phone Number",
  "contact.formMsgLabel": "Operational Requirements / Automation Needs",
  "contact.formSubmitBtn": "Submit Integration Request",

  // Footer section
  "footer.tagline": "Next-generation business automation and custom enterprise software solutions.",
  "footer.copyright": "© 2026 TriSmart Systems & Automation. All rights reserved.",
};

interface CMSContextType {
  content: Record<string, string>;
  isEditMode: boolean;
  setEditMode: (val: boolean) => void;
  updateContent: (key: string, value: string) => void;
  saveChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
  discardChanges: () => void;
  loading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const [dbContent, setDbContent] = useState<Record<string, string>>({});
  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load content from Firestore on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "settings", "website_content");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data().content || {};
          setDbContent(data);
          setLocalContent(data);
        }
      } catch (err) {
        console.error("[CMS Provider] Error loading content from Firestore:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateContent = (key: string, value: string) => {
    setLocalContent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const discardChanges = () => {
    setLocalContent(dbContent);
    toast.success("All unsaved changes discarded");
  };

  const saveChanges = async () => {
    if (!isAdmin) {
      toast.error("Unauthorized: Admin privilege required");
      return;
    }

    setSaving(true);
    const contentPath = "settings/website_content";
    try {
      const docRef = doc(db, "settings", "website_content");
      await setDoc(
        docRef,
        {
          content: localContent,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      setDbContent(localContent);
      toast.success("Website published successfully!", {
        icon: "🚀",
        style: {
          background: "#10B981",
          color: "#fff",
        }
      });
    } catch (err) {
      console.error("[CMS Provider] Error publishing changes:", err);
      handleFirestoreError(err, OperationType.WRITE, contentPath);
      toast.error("Failed to publish changes");
    } finally {
      setSaving(false);
    }
  };

  const hasUnsavedChanges = JSON.stringify(dbContent) !== JSON.stringify(localContent);

  // Auto-disable edit mode if user logs out or is not admin
  useEffect(() => {
    if (!isAdmin) {
      setIsEditMode(false);
    }
  }, [isAdmin]);

  // Combine defaults and custom content
  const content = {
    ...DEFAULT_CONTENT,
    ...localContent,
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        isEditMode,
        setEditMode: setIsEditMode,
        updateContent,
        saveChanges,
        hasUnsavedChanges,
        discardChanges,
        loading,
      }}
    >
      {children}

      {/* Floating Interactive Admin Toolbar */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] w-[95%] max-w-2xl"
          >
            <div className="bg-[#0B0F19]/90 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(var(--color-primary),0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 animate-pulse">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                    TriSmart Live Page Editor
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                      Admin Engine
                    </span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    {isEditMode
                      ? "Double-click or select any highlighted text to edit content directly!"
                      : "Activate Live Edit Mode to customize text throughout the website."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                {/* Edit Mode Toggle */}
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                    isEditMode
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Power className={`w-3.5 h-3.5 ${isEditMode ? "text-emerald-400" : "text-gray-400"}`} />
                  {isEditMode ? "Live Edit Active" : "Start Live Edit"}
                </button>

                {/* Save/Discard Controls */}
                {hasUnsavedChanges && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={discardChanges}
                      disabled={saving}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all duration-300"
                      title="Discard Unsaved Changes"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={saveChanges}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_20px_rgba(var(--color-primary),0.5)] transition-all duration-300 border border-transparent"
                    >
                      {saving ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      Publish
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  as?: React.ElementType;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  className = "",
  as: Component = "span",
  multiline = false,
}) => {
  const { content, isEditMode, updateContent } = useCMS();
  const textValue = content[id] || defaultText;

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const text = e.currentTarget.innerText || "";
    updateContent(id, text.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      e.currentTarget.innerText = textValue;
      e.currentTarget.blur();
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{textValue}</Component>;
  }

  return (
    <Component
      contentEditable={true}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} cursor-text outline-none focus:outline-none ring-1 ring-emerald-500/40 bg-emerald-500/5 focus:ring-2 focus:ring-emerald-400 focus:bg-emerald-500/10 rounded px-1.5 py-0.5 transition-all duration-300 relative group/edit inline-block`}
      title={`Admin: Edit ${id}`}
    >
      {textValue}
    </Component>
  );
};
