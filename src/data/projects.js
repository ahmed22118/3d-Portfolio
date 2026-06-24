export const projects = [
  {
    id: 'retinal',
    title: 'AI-Powered Retinal Disease Detection System',
    category: 'Computer Vision & Healthcare AI',
    tech: ['PyTorch', 'EfficientNet-B3', 'OpenCV', 'U-Net', 'Random Forest', 'Grad-CAM'],
    description:
      'Computer vision system for glaucoma and retinal disease classification with explainable AI overlays, built for real-time clinical screening support.',
    stats: [
      { label: 'Accuracy', value: '80%' },
      { label: 'Inference', value: '28ms' },
    ],
    tags: ['Glaucoma Detection', 'Explainable AI'],
    links: {},
    featured: true,
  },
  {
    id: 'recruitment-ats',
    title: 'Multi-Branch Recruitment & Applicant Tracking System',
    category: 'Full Stack MERN Application',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Cloudinary', 'JWT', 'SMTP'],
    description:
      'End-to-end ATS supporting candidate registration, resume/cover-letter uploads, job and application tracking, interview management, and automated email workflows across multiple branches with dedicated HR and Admin dashboards.',
    tags: ['HR Dashboard', 'Admin Dashboard', 'Email Automation', 'Multi-Branch'],
    links: { github: '#', demo: '#' },
    featured: true,
  },
  {
    id: 'renalsense',
    title: 'RenalSense',
    category: 'Healthcare AI',
    tech: ['Python', 'Machine Learning', 'PyTorch'],
    description:
      'AI-powered system for early detection of Chronic Kidney Disease and Diabetes using interpretable predictive models on lifestyle and symptom-based clinical data, paired with an interactive health-monitoring dashboard and personalized recommendations.',
    tags: ['Interpretable ML', 'Health Dashboard'],
    links: {},
    featured: true,
  },
  {
    id: 'qwen-vl',
    title: 'Qwen2-VL Fine-Tuning for Document-to-Markdown',
    category: 'Generative AI',
    tech: ['QLoRA', 'PEFT', '4-bit Quantization', 'Hugging Face', 'Gradio'],
    description:
      'Fine-tuned Qwen2-VL-2B-Instruct on the Nougat document dataset using 4-bit NF4 QLoRA with rank 8–16 LoRA adapters for document-image-to-Markdown generation, deployed as a live Gradio inference app.',
    tags: ['QLoRA', 'ChatML Preprocessing'],
    links: {},
  },
  {
    id: 'ddpm',
    title: 'DDPM From Scratch',
    category: 'Generative AI',
    tech: ['PyTorch', 'U-Net', 'Mixed Precision'],
    description:
      'Full diffusion model pipeline — forward noising, reverse denoising, sinusoidal time-step embeddings, and a residual U-Net (64→128→256) — for high-resolution generation on CelebA-HQ 256×256, evaluated via PSNR/SSIM and deployed on Hugging Face Spaces.',
    tags: ['Forward Noising', 'Reverse Denoising', 'PSNR/SSIM'],
    links: {},
  },
  {
    id: 'mae',
    title: 'Masked Autoencoder (MAE)',
    category: 'Self-Supervised Learning',
    tech: ['PyTorch', 'Vision Transformer', 'AdamW'],
    description:
      'Asymmetric Transformer MAE built from scratch — a ViT-Base encoder processing only 25% of visible patches, paired with a lightweight decoder reconstructing the remaining 75% masked content on TinyImageNet 224×224.',
    tags: ['ViT-Base', 'Masked Patch Learning'],
    links: {},
  },
  {
    id: 'frontend-exp',
    title: 'Interactive Frontend Experience',
    category: 'Frontend Engineering',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    description:
      'Modern, responsive frontend project demonstrating UI/UX craft and core frontend engineering principles.',
    tags: ['UI/UX', 'Responsive'],
    links: { demo: 'https://f223866-ahmed-bcs-8f-asg6.netlify.app/' },
  },
  {
    id: 'web-app',
    title: 'Modern Web Application',
    category: 'Frontend Engineering',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    description:
      'Responsive web application showcasing advanced JavaScript and modern frontend development practices.',
    tags: ['JavaScript', 'Responsive'],
    links: { demo: 'https://f223866-ahmed-bcs-8f-asf5.netlify.app/' },
  },
]
