// Tier colors: gold = expert, blue = advanced, green = intermediate
export const TIERS = {
  expert: { color: '#FBBF24', glow: 'rgba(251,191,36,0.55)', label: 'Expert' },
  advanced: { color: '#00E5FF', glow: 'rgba(0,229,255,0.55)', label: 'Advanced' },
  intermediate: { color: '#22C55E', glow: 'rgba(34,197,94,0.5)', label: 'Intermediate' },
}

const s = (id, label, tier, category, description, usedIn) => ({
  id, label, tier, category, description, usedIn,
})

export const skills = [
  // AI & Machine Learning
  s('python', 'Python', 'expert', 'AI & ML', 'Core language for every model, pipeline, and experiment.', ['All AI/ML Projects', 'Data Pipelines', 'Backend Tooling']),
  s('pytorch', 'PyTorch', 'expert', 'AI & ML', 'Primary deep learning framework for research and production models.', ['Computer Vision', 'Generative AI', 'Diffusion Models', 'MAE', 'QLoRA Projects']),
  s('tensorflow', 'TensorFlow', 'intermediate', 'AI & ML', 'Used for select model training and deployment workflows.', ['Model Prototyping']),
  s('sklearn', 'Scikit-Learn', 'advanced', 'AI & ML', 'Classical ML toolkit for baselines, evaluation, and feature pipelines.', ['RenalSense', 'Retinal Disease Detection']),
  s('opencv', 'OpenCV', 'advanced', 'AI & ML', 'Image processing and preprocessing backbone for vision pipelines.', ['Computer Vision', 'Retinal Disease Detection']),
  s('cv', 'Computer Vision', 'expert', 'AI & ML', 'Designing and training models that understand visual data end-to-end.', ['Retinal Disease Detection', 'MAE', 'DDPM']),
  s('dl', 'Deep Learning', 'expert', 'AI & ML', 'Architecting and training deep neural networks from scratch.', ['All Generative AI & CV Projects']),
  s('nn', 'Neural Networks', 'expert', 'AI & ML', 'Foundational building blocks behind every model shipped.', ['CNNs', 'Transformers', 'Diffusion Models']),
  s('cnn', 'CNNs', 'expert', 'AI & ML', 'Convolutional architectures for image classification and feature extraction.', ['Computer Vision', 'Retinal Disease Detection']),
  s('vit', 'Vision Transformers', 'advanced', 'AI & ML', 'Patch-based transformer architectures for vision tasks.', ['Masked Autoencoder (MAE)']),
  s('unet', 'U-Net', 'advanced', 'AI & ML', 'Encoder-decoder architecture for dense prediction and diffusion denoising.', ['DDPM', 'Pix2Pix', 'Retinal Disease Detection']),
  s('resnet', 'ResNet', 'advanced', 'AI & ML', 'Residual architectures for stable deep network training.', ['Computer Vision']),
  s('ssl', 'Self-Supervised Learning', 'advanced', 'AI & ML', 'Learning representations from unlabeled data via pretext tasks.', ['Masked Autoencoder (MAE)']),
  s('mtl', 'Multi-Task Learning', 'intermediate', 'AI & ML', 'Training single models across multiple related objectives.', ['Research Experiments']),

  // Generative AI
  s('genai', 'Generative AI', 'expert', 'Generative AI', 'Building systems that generate novel images, text, and structured data.', ['DDPM', 'GANs', 'Qwen2-VL Fine-Tuning']),
  s('diffusion', 'Diffusion Models', 'expert', 'Generative AI', 'Noise-based generative modeling for high-fidelity image synthesis.', ['DDPM From Scratch']),
  s('ddpm', 'DDPM', 'advanced', 'Generative AI', 'Denoising Diffusion Probabilistic Models built from first principles.', ['DDPM From Scratch']),
  s('gan', 'GANs', 'advanced', 'Generative AI', 'Adversarial training for realistic image generation.', ['DCGAN vs WGAN-GP']),
  s('dcgan', 'DCGAN', 'intermediate', 'Generative AI', 'Convolutional GAN architecture for image synthesis.', ['DCGAN vs WGAN-GP']),
  s('wgan', 'WGAN-GP', 'advanced', 'Generative AI', 'Wasserstein loss with gradient penalty for stable GAN training.', ['DCGAN vs WGAN-GP']),
  s('pix2pix', 'Pix2Pix', 'advanced', 'Generative AI', 'Conditional GAN for image-to-image translation.', ['Anime Sketch Colorizer']),
  s('prompt', 'Prompt Engineering', 'advanced', 'Generative AI', 'Designing inputs that reliably steer generative model outputs.', ['AI Story Teller', 'Qwen2-VL']),
  s('finetune', 'LLM Fine-Tuning', 'advanced', 'Generative AI', 'Adapting pretrained large models to specialized tasks.', ['Qwen2-VL Fine-Tuning']),
  s('peft', 'PEFT', 'advanced', 'Generative AI', 'Parameter-efficient fine-tuning strategies for large models.', ['Qwen2-VL Fine-Tuning']),
  s('lora', 'LoRA', 'advanced', 'Generative AI', 'Low-rank adapters for efficient model fine-tuning.', ['Qwen2-VL Fine-Tuning']),
  s('qlora', 'QLoRA', 'expert', 'Generative AI', 'Quantized LoRA fine-tuning enabling large-model training on limited hardware.', ['Qwen2-VL Fine-Tuning']),
  s('quant', '4-bit Quantization', 'advanced', 'Generative AI', 'Compressing model weights to 4-bit precision for efficient inference.', ['Qwen2-VL Fine-Tuning']),
  s('hf', 'Hugging Face', 'advanced', 'Generative AI', 'Model hub and deployment ecosystem for transformer-based projects.', ['Qwen2-VL', 'DDPM Deployment']),

  // NLP & Vision-Language Models
  s('nlp', 'NLP', 'advanced', 'NLP & VLM', 'Processing and generating natural language for downstream tasks.', ['AI Story Teller', 'Qwen2-VL']),
  s('transformers', 'Transformers', 'expert', 'NLP & VLM', 'Attention-based architectures powering modern AI systems.', ['NLP', 'Vision Transformers', 'Qwen2-VL']),
  s('qwen', 'Qwen2-VL', 'advanced', 'NLP & VLM', 'Vision-language model fine-tuned for document understanding.', ['Document-to-Markdown']),
  s('vlm', 'Vision Language Models', 'advanced', 'NLP & VLM', 'Multimodal models that reason over both images and text.', ['Qwen2-VL Fine-Tuning']),
  s('docu', 'Document Understanding', 'intermediate', 'NLP & VLM', 'Extracting structured information from document images.', ['Qwen2-VL Fine-Tuning']),
  s('textgen', 'Text Generation', 'intermediate', 'NLP & VLM', 'Generating coherent, structured natural language output.', ['AI Story Teller']),
  s('chatml', 'ChatML', 'intermediate', 'NLP & VLM', 'Structured conversational format for instruction-tuned models.', ['Qwen2-VL Fine-Tuning']),
  s('embeddings', 'Embeddings', 'advanced', 'NLP & VLM', 'Dense vector representations powering retrieval and similarity tasks.', ['NLP Pipelines']),

  // Full Stack Development
  s('html', 'HTML5', 'expert', 'Full Stack', 'Semantic markup foundation for every interface shipped.', ['All Frontend Projects']),
  s('css', 'CSS3', 'expert', 'Full Stack', 'Styling, layout, and animation across all interfaces.', ['All Frontend Projects']),
  s('js', 'JavaScript', 'expert', 'Full Stack', 'Core scripting language for interactive, dynamic web apps.', ['Interactive Frontend Experience', 'Modern Web Application']),
  s('ts', 'TypeScript', 'advanced', 'Full Stack', 'Typed superset of JavaScript for safer, scalable codebases.', ['React Applications']),
  s('react', 'React.js', 'expert', 'Full Stack', 'Component-driven library powering this portfolio and production apps.', ['MERN Stack', 'This Portfolio']),
  s('vite', 'Vite', 'advanced', 'Full Stack', 'Next-generation build tool for fast development and optimized builds.', ['This Portfolio']),
  s('tailwind', 'Tailwind CSS', 'advanced', 'Full Stack', 'Utility-first styling system for rapid, consistent UI.', ['This Portfolio']),
  s('node', 'Node.js', 'expert', 'Full Stack', 'JavaScript runtime powering backend services and APIs.', ['MERN Stack', 'Recruitment ATS']),
  s('express', 'Express.js', 'advanced', 'Full Stack', 'Minimal backend framework for building REST APIs.', ['Recruitment ATS']),
  s('rest', 'REST APIs', 'advanced', 'Full Stack', 'Designing and consuming stateless HTTP APIs.', ['Recruitment ATS']),
  s('jwt', 'JWT Authentication', 'advanced', 'Full Stack', 'Token-based authentication for secure web applications.', ['Recruitment ATS']),

  // Databases
  s('mongodb', 'MongoDB', 'advanced', 'Databases', 'Document database backing full-stack MERN applications.', ['Recruitment ATS']),
  s('mysql', 'MySQL', 'intermediate', 'Databases', 'Relational database for structured application data.', ['Backend Projects']),
  s('sql', 'SQL', 'intermediate', 'Databases', 'Querying and modeling relational data.', ['Backend Projects']),

  // Cloud & Deployment
  s('docker', 'Docker', 'advanced', 'Cloud', 'Containerizing models and apps for consistent, portable deployment.', ['DDPM Deployment', 'Qwen2-VL Deployment']),
  s('aws', 'AWS', 'intermediate', 'Cloud', 'Cloud infrastructure for hosting and scaling applications.', ['Deployment Pipelines']),
  s('cloudinary', 'Cloudinary', 'intermediate', 'Cloud', 'Media storage and optimization for uploaded assets.', ['Recruitment ATS']),
  s('gradio', 'Gradio', 'advanced', 'Cloud', 'Rapid UI framework for deploying interactive ML demos.', ['DDPM', 'Qwen2-VL']),
  s('hfspaces', 'Hugging Face Spaces', 'advanced', 'Cloud', 'Hosting platform for live ML model demos.', ['DDPM From Scratch']),
  s('git', 'Git', 'expert', 'Cloud', 'Version control for every project and experiment.', ['All Projects']),
  s('github', 'GitHub', 'expert', 'Cloud', 'Source hosting, collaboration, and CI workflows.', ['All Projects']),
  s('cicd', 'CI/CD', 'intermediate', 'Cloud', 'Automated build, test, and deployment pipelines.', ['Production Workflows']),

  // Software Engineering
  s('oop', 'OOP', 'expert', 'Software Eng.', 'Object-oriented design principles across codebases.', ['All Projects']),
  s('dsa', 'Data Structures', 'expert', 'Software Eng.', 'Core structures underpinning efficient algorithms.', ['Coursework', 'Interviews']),
  s('algo', 'Algorithms', 'expert', 'Software Eng.', 'Problem-solving foundations applied across AI and software work.', ['Coursework', 'Interviews']),
  s('sysdesign', 'System Design', 'advanced', 'Software Eng.', 'Architecting scalable, maintainable application systems.', ['Recruitment ATS']),
  s('apidesign', 'API Design', 'advanced', 'Software Eng.', 'Designing clean, predictable interfaces between services.', ['Recruitment ATS']),
  s('agile', 'Agile Development', 'intermediate', 'Software Eng.', 'Iterative development and team collaboration practices.', ['Team Projects']),
]

// Neural connections: pairs of skill ids that get a glowing animated link
export const connections = [
  ['pytorch', 'cnn'], ['cnn', 'cv'], ['cv', 'opencv'],
  ['transformers', 'nlp'], ['nlp', 'qwen'],
  ['mongodb', 'express'], ['express', 'react'], ['react', 'node'],
  ['diffusion', 'ddpm'], ['ddpm', 'unet'],
  ['gan', 'dcgan'], ['gan', 'wgan'],
  ['vit', 'ssl'],
  ['qlora', 'lora'], ['lora', 'peft'], ['peft', 'finetune'],
  ['qwen', 'vlm'], ['vlm', 'docu'],
  ['pytorch', 'dl'], ['dl', 'nn'],
  ['genai', 'diffusion'], ['genai', 'gan'],
  ['docker', 'gradio'], ['gradio', 'hfspaces'],
  ['python', 'pytorch'], ['python', 'sklearn'],
  ['node', 'jwt'], ['jwt', 'rest'],
]
