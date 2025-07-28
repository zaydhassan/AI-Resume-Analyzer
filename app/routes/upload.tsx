import { type FormEvent, useState } from 'react';
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText('Uploading the file...');
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText('Error: Failed to upload file');

    setStatusText('Converting to image...');
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

    setStatusText('Uploading the image...');
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText('Error: Failed to upload image');

    setStatusText('Preparing data...');
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: '',
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analyzing...');
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackText = typeof feedback.message.content === 'string'
      ? feedback.message.content
      : feedback.message.content[0].text;
    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analysis complete, redirecting...');
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(140deg, #d2eafd 0%, #c7fcfa 64%, #d2e7fd 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1rem",
        }}
      >
        {/* Glass Card */}
        <div
          style={{
            width: "100%",
            maxWidth: 700,
            background: "rgba(255,255,255,0.93)",
            borderRadius: "28px",
            boxShadow: "0 9px 42px 0 rgba(18,124,189,0.09), 0 1.2px 16px #45e7c61f",
            backdropFilter: "blur(14px)",
            padding: "2.8rem 2.3rem 2.14rem 2.3rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.27rem",
              fontWeight: 900,
              letterSpacing: ".015em",
              marginBottom: "1.15rem",
              color: "#1897c6",
              background: "linear-gradient(90deg,#1ec0e3 18%,#6bfedb 95%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Instant Resume Analyzer
          </h2>
          <p
            style={{
              fontSize: "1.11rem",
              color: "#2fb0a9",
              fontWeight: 500,
              marginBottom: "2.0rem",
              textAlign: "center",
              lineHeight: 1.62,
              letterSpacing: ".01em"
            }}
          >
            Upload your resume for instant ATS scoring and AI-powered tips.
            <br />
            <span style={{ color: "#0b89d0", fontWeight: 700, fontSize: "1.07rem" }}>
              Job fields are optional &mdash; get feedback instantly!
            </span>
          </p>

          {isProcessing ? (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", minHeight: 260}}>
              <div style={{
                fontWeight: 700,
                fontSize: "1.14rem",
                color: "#1997c5",
                marginBottom: "1.18rem",
                letterSpacing: ".012em"
              }}>{statusText}</div>
              <img src="/images/resume-scan.gif"
                alt="Analyzing..."
                style={{
                  width: "82%",
                  maxWidth: 300,
                  borderRadius: 16,
                  marginBottom: ".35rem",
                  boxShadow: "0 7px 26px #b3effb30"
                }} />
              <div style={{
                marginTop: 16, color:"#45bfae", fontSize: "1rem", fontWeight: 500, fontStyle:"italic"
              }}>Please wait while we analyze your resume…</div>
            </div>
          ) : (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.13rem",
                marginTop: "1rem",
                maxWidth: 440,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                <label htmlFor="company-name" style={{ fontWeight: 600, color: "#2197a7", fontSize: "1rem" }}>
                  Company Name <span style={{ fontWeight: 400, color: "#6bbcd0" }}>(optional)</span>
                </label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="e.g. Google"
                  id="company-name"
                  autoComplete="organization"
                  style={{
                    padding: "0.85rem 1.1rem",
                    borderRadius: "10px",
                    border: "1.2px solid #b0e1f7",
                    fontSize: "1rem",
                    background: "#f4fafc",
                    width: "100%",
                    boxSizing: "border-box"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                <label htmlFor="job-title" style={{ fontWeight: 600, color: "#2197a7", fontSize: "1rem" }}>
                  Job Title <span style={{ fontWeight: 400, color: "#6bbcd0" }}>(optional)</span>
                </label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="e.g. Software Engineer"
                  id="job-title"
                  autoComplete="off"
                  style={{
                    padding: "0.85rem 1.1rem",
                    borderRadius: "10px",
                    border: "1.2px solid #b0e1f7",
                    fontSize: "1rem",
                    background: "#f4fafc",
                    width: "100%",
                    boxSizing: "border-box"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                <label htmlFor="job-description" style={{ fontWeight: 600, color: "#2197a7", fontSize: "1rem" }}>
                  Job Description <span style={{ fontWeight: 400, color: "#6bbcd0" }}>(optional)</span>
                </label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="e.g. Seeking a frontend engineer with strong React skills…"
                  id="job-description"
                  autoComplete="off"
                  style={{
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "1.2px solid #b0e1f7",
                    fontSize: "1rem",
                    background: "#f4fafc",
                    width: "100%",
                    boxSizing: "border-box",
                    resize: "vertical"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                <label htmlFor="uploader" style={{ fontWeight: 600, color: "#2197a7", fontSize: "1rem" }}>
                  Upload Resume <span style={{ color: "#e96c6c", fontWeight: 700 }}>*</span>
                </label>
                <div style={{ width: "100%" }}>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  background: "linear-gradient(90deg,#24afea 12%,#15ebc1 95%)",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "1.14rem",
                  borderRadius: "24px",
                  padding: "1.04rem 0.3rem",
                  marginTop: "1.4rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 18px #45e7c64a",
                  transition: "transform 0.12s, box-shadow 0.12s, background .11s"
                }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Analyze Resume
              </button>
            </form>
          )}
        </div>
        {/* Responsive styling for mobile */}
        <style>
          {`
            @media (max-width: 600px) {
              div[style*="max-width: 520px"] {
                padding: 0.88rem 2vw 0.9rem 2vw !important;
              }
              h2 {
                font-size: 1.28rem !important;
              }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Upload;