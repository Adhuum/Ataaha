import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Award, 
  GraduationCap, 
  Heart, 
  Lightbulb, 
  ShieldCheck,
  Zap,
  Star,
  MessageCircle,
  Layout,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Rocket,
  Compass
} from 'lucide-react';

// --- Shared Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'عن المركز', href: '#about' },
    { name: 'مشروع مسار', href: '#masar' },
    { name: 'البرامج', href: '#services' },
    { name: 'الأسعار', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl">آ</div>
          <span className={`text-xl font-black ${isScrolled ? 'text-primary' : 'text-white'}`}>مركز آتاها</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-bold text-sm hover:text-accent transition-colors ${isScrolled ? 'text-slate-700' : 'text-white/90'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="#pricing" className="bg-accent text-primary px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 transition-transform">
            اشترك الآن
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} className={isScrolled ? 'text-primary' : 'text-white'} /> : <Menu size={28} className={isScrolled ? 'text-primary' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl p-6 lg:hidden flex flex-col gap-4 text-right"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-800 font-bold text-lg border-b border-slate-100 pb-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Section = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => (
  <section id={id} className={`py-24 px-6 lg:px-24 overflow-hidden relative ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-16 text-center lg:text-right border-r-8 border-accent pr-8">
    <motion.h2 
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`text-5xl lg:text-6xl font-black mb-6 ${light ? 'text-white' : 'text-primary'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-xl lg:text-2xl max-w-3xl font-medium ${light ? 'text-white/80' : 'text-slate-500'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const CourseCard = ({ title, target, lessons, intro, segments, instructor, icon: Icon = Target }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -12, scale: 1.02 }}
    className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10 flex flex-col h-full hover:shadow-2xl hover:border-secondary/30 transition-all duration-500 relative group overflow-hidden"
  >
    <div className="absolute -top-12 -left-12 w-32 h-32 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
    
    <div className="flex items-center justify-between mb-8 relative z-10">
      <div className="p-4 bg-surface rounded-2xl">
        <Icon className="text-secondary" size={28} />
      </div>
      <span className="bg-accent text-primary px-5 py-2 rounded-xl text-xs font-black tracking-widest">
        {lessons || 'محاضرات'}
      </span>
    </div>
    
    <h3 className="text-3xl font-black text-primary mb-3 leading-tight relative z-10">{title}</h3>
    <p className="text-secondary font-black text-sm mb-6 relative z-10 border-b border-slate-100 pb-4">بإشراف: {instructor}</p>
    
    <div className="flex items-center gap-3 mb-6 text-slate-500 font-bold relative z-10">
      <Users size={20} className="text-accent" />
      <span>{target}</span>
    </div>

    {intro && (
      <p className="text-slate-600 text-sm leading-relaxed mb-8 italic border-r-4 border-accent pr-4 relative z-10">{intro}</p>
    )}

    {segments && (
      <ul className="space-y-4 mb-10 flex-grow relative z-10">
        {segments.map((s: string, i: number) => (
          <li key={i} className="flex gap-4 items-start">
            <CheckCircle2 className="text-secondary shrink-0 mt-1" size={18} />
            <p className="text-sm text-slate-800 font-semibold leading-relaxed">{s}</p>
          </li>
        ))}
      </ul>
    )}
    
    <button className="w-full py-4 bg-slate-50 text-primary group-hover:bg-primary group-hover:text-white rounded-2xl font-black transition-all text-center flex items-center justify-center gap-3 relative z-10">
      تفاصيل أكثر <ArrowRight size={18} />
    </button>
  </motion.div>
);

// --- Layout Sections ---

const Hero = () => (
  <Section id="home" className="pt-48 pb-32 bg-primary min-h-screen flex items-center relative overflow-hidden">
    {/* Abstract Background Elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-20deg] origin-top translate-x-20" />
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0]
      }}
      transition={{ duration: 20, repeat: Infinity }}
      className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-secondary/20 rounded-full blur-[120px]" 
    />
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-center lg:text-right"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 bg-accent text-primary px-6 py-2 rounded-full text-sm font-black mb-8 shadow-xl"
        >
          <Sparkles size={16} /> تنشئة جيل سويّ، قوي الإيمان
        </motion.div>
        
        <h1 className="text-6xl lg:text-8xl font-black text-white mb-10 leading-tight">
          مشروع <span className="text-accent underline decoration-8 underline-offset-[12px]">مـسـار</span> <br />
          <span className="text-secondary italic">لتمكين</span> المربين
        </h1>
        
        <p className="text-2xl lg:text-3xl text-white/80 font-medium leading-relaxed max-w-3xl mb-14 mx-auto lg:mx-0">
          خطوة عملية لإعادة تثبيت أساس المربي، تجمع بين التأصيل الشرعي الرصين والمهارة التربوية الحديثة.
        </p>
        
        <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
          <a href="#services" className="bg-secondary hover:bg-secondary/90 text-white px-14 py-6 rounded-[2rem] font-black text-2xl transition-all shadow-2xl shadow-secondary/30 flex items-center gap-4 group">
            اكتشف البرامج <Rocket className="group-hover:translate-x-[-10px] transition-transform" />
          </a>
          <a href="#about" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-12 py-6 rounded-[2rem] font-bold text-2xl transition-all">
            عن مركز آتاها
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden lg:block relative"
      >
        <div className="relative z-10 w-full aspect-square bg-gradient-to-br from-accent to-secondary p-1 rounded-[4rem] group overflow-hidden">
          <div className="w-full h-full bg-primary rounded-[3.8rem] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200" alt="Education" className="w-full h-full object-cover opacity-60 mix-blend-overlay hover:scale-110 transition-transform duration-1000" />
          </div>
        </div>
        {/* Floating cards */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100"
        >
          <Award className="text-accent mb-2" size={40} />
          <p className="text-primary font-black text-xl">6+ سنوات</p>
          <p className="text-xs text-slate-500 font-bold">خبرة ميدانية مباشرة</p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100"
        >
          <Users className="text-secondary mb-2" size={40} />
          <p className="text-primary font-black text-xl">1000+ متدرب</p>
          <p className="text-xs text-slate-500 font-bold">مربٍّ ومُعلّم تم تمكينهم</p>
        </motion.div>
      </motion.div>
    </div>
  </Section>
);

const About = () => (
  <Section id="about" className="bg-white">
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="عن مركز آتاها" subtitle="آتاها ليس مركزاً عابراً في مسيرتكم، بل شريك تربوي في صناعة المستقبل." />
      
      <div className="grid lg:grid-cols-2 gap-20 items-stretch">
        <div className="space-y-10 order-2 lg:order-1">
          <p className="text-2xl text-slate-700 leading-relaxed font-medium">
            مركز آتاها هو مركز متخصص في بناء الإنسان معرفيًا وتربويًا وقيميًا، تأسس في عمّان – الأردن عام 2020، ويعمل على تصميم وتنفيذ برامج احترافية تستجيب لتحديات الواقع المعاصر.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { icon: ShieldCheck, title: "رؤية راسخة", desc: "بناء الهوية الإسلامية المتزنة", color: "bg-blue-50 text-blue-600" },
              { icon: Zap, title: "برامج عملية", desc: "ترجمة المعرفة إلى سلوك ملموس", color: "bg-amber-50 text-amber-600" },
              { icon: BookOpen, title: "تأصيل معرفي", desc: "مرجعية شرعية واضحة ومنضبطة", color: "bg-indigo-50 text-indigo-600" },
              { icon: Layout, title: "بيئات جاذبة", desc: "صناعة أثر يتجاوز حدود الصف", color: "bg-emerald-50 text-emerald-600" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-surface border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col gap-4"
              >
                <div className={`p-4 rounded-2xl w-fit ${item.color}`}>
                  <item.icon size={28} />
                </div>
                <h4 className="text-xl font-black text-primary">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-[4rem] p-12 text-white relative overflow-hidden order-1 lg:order-2 flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <Sparkles className="text-accent mb-8" size={64} />
            <h3 className="text-4xl font-black mb-8 leading-tight">مركز آتاها يقدّم للتعليم ما يتجاوز المحتوى... يقدّم بناء الإنسان.</h3>
            <p className="text-xl text-white/80 leading-relaxed mb-12">
                نعمل كشريك داعم لرسالة المدرسة في بناء شخصية الطالب، تعزيز الانضباط، رفع الوعي، وتطوير السلوك الإيجابي.
            </p>
            <div className="flex gap-10 items-center border-t border-white/10 pt-10">
                <div>
                   <p className="text-5xl font-black text-accent">6+</p>
                   <p className="text-xs opacity-60 tracking-widest uppercase mt-1">سنوات ميدانية</p>
                </div>
                <div>
                   <p className="text-5xl font-black text-accent">50+</p>
                   <p className="text-xs opacity-60 tracking-widest uppercase mt-1">مشروع نوعي</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </Section>
);

const ProjectMasar = () => (
  <Section id="masar" className="bg-surface">
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="مشروع مـسـار" 
        subtitle="تمكين المؤسسات التعليمية من بناء كوادر تربوية راسخة، تمتلك المهارة والوعي." 
      />
      
      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-10">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-full bg-accent" />
            <blockquote className="text-2xl font-bold text-primary leading-relaxed italic mb-8 border-r-8 border-slate-100 pr-8">
              "أزمة الجيل اليوم ليست أزمة معلومات، بل أزمة توجيه وتربية وتمكين للمربي نفسه."
            </blockquote>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              نقدّم دورات تربوية ومعرفية ومهارية موجهة للمدارس والمراكز، تركّز على تأصيل المعلم شرعيًا، وبنائه نفسيًا، وتمكينه عمليًا بأدوات تطبيقية مباشرة.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary text-white p-10 rounded-[3rem] shadow-xl">
              <h4 className="text-2xl font-black text-accent mb-6 italic">ما يميز مسار؟</h4>
              <ul className="space-y-6">
                {["واقعية وعملية بعيدة عن التنظير", "خبرة ميدانية ممتدة لأكثر من 6 سنوات", "مخاطبة الجيل بلغة يفهمها", "رؤية شرعية رصينة تواكب العصر"].map((item, i) => (
                  <li key={i} className="flex gap-4 font-bold text-lg">
                    <div className="w-2 h-2 rounded-full bg-accent mt-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary text-white p-10 rounded-[3rem] shadow-xl">
              <h4 className="text-2xl font-black text-white/80 mb-6 italic">الأثر المتوقع</h4>
              <ul className="space-y-6">
                {["معلمون أكثر وعيًا بطبائع الجيل", "ثقة وحكمة في الإجابة عن الحساس", "أدوات عملية لضبط الصف والهيبة", "تحصين الهوية أمام التيارات"].map((item, i) => (
                  <li key={i} className="flex gap-4 font-bold text-lg">
                    <CheckCircle2 className="text-white/40 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden flex-grow group">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200" alt="Project" className="w-full h-1/2 object-cover transition-transform group-hover:scale-105" />
              <div className="p-10 text-right">
                  <h4 className="text-3xl font-black text-primary mb-4">لماذا مسار؟</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    لأن صلاح الجيل يبدأ بثبات من يربيه. نحن لا نمنحك فقط "دورة تدريبية"، بل خطوة عملية لإعادة هندسة حضورك التربوي.
                  </p>
                  <div className="mt-8 p-6 bg-surface rounded-2xl flex items-center gap-4 text-primary font-black">
                      <Compass className="text-accent" /> دورات مرنة - مستقلة ومتكاملة
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const Pricing = () => (
  <Section id="pricing" className="bg-surface overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[600px] bg-primary skew-y-[-4deg] translate-y-[-300px]" />
    
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionTitle title="دليل استثمار الكوادر" subtitle="نقدم أسعاراً تنافسية لدعم المؤسسات التعليمية بـ 10-20 معلماً للدورة" light />
      
      <div className="grid lg:grid-cols-3 gap-10 mt-20">
        {/* Basic */}
        <motion.div whileHover={{ y: -20 }} className="bg-white p-12 rounded-[4rem] flex flex-col items-center text-center shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 mb-8 border border-slate-100">
            <Zap size={32} />
          </div>
          <h4 className="text-3xl font-black text-primary mb-4">المسار الحُر</h4>
          <p className="text-slate-500 font-bold mb-8 italic">طلب دورة واحدة محددة</p>
          <div className="mb-10 bg-surface px-8 py-4 rounded-3xl">
            <span className="text-6xl font-black text-primary">80</span>
            <span className="text-lg font-bold text-slate-400 mr-2">د.أ / محاضرة</span>
          </div>
          <p className="text-slate-600 font-medium mb-10 leading-relaxed">تختار المؤسسة الدورة المناسبة لحاجتها الحالية من دليل الدورات.</p>
          <button className="w-full py-5 bg-slate-100 text-primary hover:bg-primary hover:text-white rounded-[2.5rem] font-black transition-all mt-auto shadow-xl">اطلب الدورة</button>
        </motion.div>

        {/* Featured */}
        <motion.div whileHover={{ y: -20 }} className="bg-white p-14 rounded-[4rem] flex flex-col items-center text-center shadow-[0_40px_100px_-20px_rgba(37,99,235,0.2)] border-4 border-secondary relative scale-110 z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-primary px-10 py-3 rounded-full font-black text-sm tracking-widest shadow-xl ring-8 ring-white">الأكثر نفعاً</div>
          <div className="w-24 h-24 bg-secondary rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-2xl shadow-secondary/30">
            <Award size={48} />
          </div>
          <h4 className="text-4xl font-black text-primary mb-4">المسار التخصصي</h4>
          <p className="text-secondary font-black mb-8 italic tracking-widest underline decoration-accent underline-offset-8 decoration-4">بكج مُركّز ومُوجّه</p>
          <div className="mb-4">
            <span className="text-7xl font-black text-primary tracking-tighter">65</span>
            <span className="text-xl font-bold text-secondary mr-2 italic">د.أ / محاضرة</span>
          </div>
          <p className="text-accent font-black text-xs uppercase tracking-[0.2em] mb-12">خصم 15% + جلسة متابعة</p>
          <div className="space-y-4 w-full mb-12">
            <div className="p-5 bg-surface rounded-2xl flex justify-between items-center text-sm font-black border border-slate-50">
              <span className="text-slate-500">باقة 3 دورات</span>
              <span className="text-primary italic">800 - 1000 د.أ</span>
            </div>
            <div className="p-5 bg-surface rounded-2xl flex justify-between items-center text-sm font-black border border-slate-50">
              <span className="text-slate-500">باقة 4 دورات</span>
              <span className="text-primary italic">1100 - 1300 د.أ</span>
            </div>
          </div>
          <button className="w-full py-6 bg-secondary text-white rounded-[2.5rem] font-black hover:bg-primary transition-all mt-auto shadow-2xl shadow-secondary/20 scale-105 active:scale-95">ابدأ المسار التخصصي</button>
        </motion.div>

        {/* Premium */}
        <motion.div whileHover={{ y: -20 }} className="bg-primary p-12 rounded-[4rem] flex flex-col items-center text-center shadow-2xl text-white">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-accent mb-8 border border-white/10">
            <Star size={32} />
          </div>
          <h4 className="text-3xl font-black mb-4">شريك استراتيجي</h4>
          <p className="text-white/60 font-bold mb-8 italic">تعاقد سنوي شامل</p>
          <div className="mb-4">
            <span className="text-6xl font-black text-accent tracking-tighter">50</span>
            <span className="text-lg font-bold text-white/40 mr-2 italic">د.أ / محاضرة</span>
          </div>
          <p className="text-accent font-black text-xs uppercase tracking-[0.2em] mb-12 underline decoration-white/10 underline-offset-8 decoration-2">خصم 30% + رعاية سنوية</p>
          <div className="mb-12">
            <span className="text-5xl font-black text-white">2700</span>
            <span className="text-xs block opacity-40 font-bold mt-2 uppercase tracking-widest">د.أ استثمار سنوي (10 دورات)</span>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full mb-12 opacity-80">
            <div className="p-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-tighter">30% بداية</div>
            <div className="p-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-tighter">40% منتصف</div>
            <div className="p-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-tighter">30% ختام</div>
          </div>
          <button className="w-full py-5 bg-white text-primary rounded-[2.5rem] font-black hover:bg-accent transition-all mt-auto shadow-2xl shadow-white/10">تعاقد سنوي</button>
        </motion.div>
      </div>
    </div>
  </Section>
);

const Founders = () => (
  <Section id="founders" className="bg-white">
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="مؤسسو المركز" subtitle="اجتماع التأصيل الشرعي بالرؤية النفسية والاجتماعية الميدانية." />
      <div className="grid lg:grid-cols-2 gap-12">
          {/* Essam */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-surface p-12 rounded-[4rem] border-b-[16px] border-primary flex flex-col lg:flex-row gap-10 items-center lg:items-start group">
              <div className="w-40 h-40 rounded-[3rem] bg-primary flex items-center justify-center text-white text-6xl font-black shrink-0 shadow-2xl relative overflow-hidden">
                  ع
                  <div className="absolute inset-0 bg-accent group-hover:translate-y-0 translate-y-full transition-transform duration-500 opacity-20" />
              </div>
              <div className="text-center lg:text-right">
                  <h3 className="text-4xl font-black text-primary mb-3">عصام سلطان</h3>
                  <p className="text-secondary font-black text-sm tracking-widest uppercase mb-8">مدير المركز / مدرّب تربوي</p>
                  <p className="text-slate-600 font-medium leading-relaxed italic border-r-4 border-accent pr-6">
                    أجمع في مسيرتي بين التأصيل الشرعي العميق والرؤية التربوية الحديثة. دراسات عليا في التربية، مدير المرحلة الثانوية في مدارس التلال الذهبية. خبير في تصميم المشاريع والمخيمات التربوية النوعية.
                  </p>
              </div>
          </motion.div>

          {/* Ali */}
          <motion.div whileHover={{ scale: 1.02 }} className="bg-surface p-12 rounded-[4rem] border-b-[16px] border-secondary flex flex-col lg:flex-row gap-10 items-center lg:items-start group">
              <div className="w-40 h-40 rounded-[3rem] bg-secondary flex items-center justify-center text-white text-6xl font-black shrink-0 shadow-2xl relative overflow-hidden">
                  ع
                  <div className="absolute inset-0 bg-accent group-hover:translate-y-0 translate-y-full transition-transform duration-500 opacity-20" />
              </div>
              <div className="text-center lg:text-right">
                  <h3 className="text-4xl font-black text-primary mb-3">علي القواسمه</h3>
                  <p className="text-secondary font-black text-sm tracking-widest uppercase mb-8">المشرف التربوي / خبير تربية</p>
                  <p className="text-slate-600 font-medium leading-relaxed italic border-r-4 border-accent pr-6">
                    باحث ماجستير في علم الاجتماع، خبير في الإرشاد الأسري وبناء المنظومات التربوية ذات المرجعية الإسلامية. 7 سنوات من العمل الميداني المباشر في إعداد المناهج وتطوير أداء المعلمين.
                  </p>
              </div>
          </motion.div>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="bg-slate-900 pt-32 pb-20 px-6 text-right text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.05] grayscale bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
    
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-20 relative z-10 border-b border-white/5 pb-20">
      <div className="lg:col-span-2">
          <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary font-black text-4xl">آ</div>
              <h3 className="text-4xl font-black text-white">مركز آتاها التعليمي التربوي</h3>
          </div>
          <p className="text-2xl font-light text-white/60 leading-relaxed max-w-3xl mb-12 italic">
            "آتاها ليس مجرد مركز، بل شريك في صناعة الأثر المستدام وبناء الإنسان الذي يعي هويته ويثبت في زمن المتغيرات."
          </p>
          <div className="flex flex-wrap gap-10">
            <div>
                <p className="text-accent font-black text-sm tracking-widest uppercase mb-4 underline">العنوان</p>
                <p className="text-xl font-bold">عمّان - الأردن</p>
                <p className="text-sm opacity-50 font-medium mt-2">المملكة الأردنية الهاشمية</p>
            </div>
            <div>
                <p className="text-accent font-black text-sm tracking-widest uppercase mb-4 underline">تواصل معنا</p>
                <p className="text-xl font-bold select-all">+962 7XXXXXXXX</p>
                <p className="text-sm opacity-50 font-medium mt-2 tracking-widest">info@ataaha.com</p>
            </div>
          </div>
      </div>
      
      <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 flex flex-col items-center justify-center text-center">
          <Rocket className="text-accent mb-8" size={64} />
          <h4 className="text-3xl font-black mb-6 italic">ابدأ مـسـارك الآن</h4>
          <p className="text-white/60 font-bold mb-10 leading-relaxed">كن جزءاً من المنظومة التي تعيد تعريف التربية المعاصرة.</p>
          <div className="flex gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent hover:text-primary transition-all cursor-pointer"><Star /></div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent hover:text-primary transition-all cursor-pointer"><Users /></div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent hover:text-primary transition-all cursor-pointer"><MessageCircle /></div>
          </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center opacity-40 text-xs font-bold tracking-widest uppercase gap-6">
        <p>© {new Date().getFullYear()} مركز آتاها التعليمي التربوي - مشروع مـسـار</p>
        <p>جميع الحقوق محفوظة - صناعة الإنسان غايتنا</p>
    </div>
  </footer>
);

export default function App() {
  const categories = [
    {
      id: "edu",
      title: "فئة الدورات التربوية",
      intro: "تأصيل الرؤية وبناء الوعي التربوي. تعنى هذه الفئة بإرساء الأسس التي يحتاجها كل مربٍ لفهم طبيعة الجيل وقراءة تحولاته حكمة واتزان.",
      icon: Heart,
      courses: [
        {
          title: "التربية الجنسية",
          instructor: "علي القواسمة",
          lessons: "6 محاضرات",
          target: "المعلمون والمعلمات والأهالي",
          intro: "منهجية التعامل مع هذه الملفات شرعيًّا وتربويًّا، وكيفية نقلها للآخرين بثقة.",
          segments: ["لماذا الحديث عن هذه المواضيع؟", "أهم التغيرات في مرحلة البلوغ", "ضبط الشهوات وقواعد الانحرافات"],
          icon: ShieldCheck
        },
        {
          title: "معلّم لا يُنسى",
          instructor: "عصام سلطان",
          lessons: "4 محاضرات",
          target: "معلمي صفوف (10-17 سنة)",
          intro: "خطوات عملية لتكون معلماً صاحب رسالة وتأثير حقيقي في طلابك.",
          segments: ["أهمية البُعد الرسالي للمعلم", "تحليل أخطاء العلاقة (المعلم الخصم)", "لغة التواصل الفعّالة للمراهقين"],
          icon: Award
        },
        {
            title: "طفل يلعب - طفل سوي",
            instructor: "رزان الطراونة",
            lessons: "باقة مركّزة",
            target: "معلمات الروضة والطفولة الأولى",
            intro: "كيفية التعامل وتربية الأبناء الصغار في أهم مراحل تكوينهم النفسي.",
            segments: ["أصول التربية باللعب الهادف", "بناء الشخصية السوية المتوازنة", "علاج المشكلات السلوكية المبكرة"],
            icon: Heart
        },
        {
            title: "كيف أكون معلماً مربياً؟",
            instructor: "علي القواسمة",
            lessons: "8 محاضرات",
            target: "كافة العاملين في الميدان",
            intro: "أهداف ومنطلقات التربية الأصيلة وبناء العلاقة الطيبة والمؤثرة.",
            segments: ["أهداف وبناء المنظومة التربوية", "أمانة الرعاية والتحمل المسؤول", "الأخطاء الشائعة وبناء الثقة"],
            icon: Users
        }
      ]
    },
    {
        id: "skills",
        title: "فئة الدورات المهارية",
        intro: "أدوات عمليـة وأثـر مباشـر. تمكين المربي بالآليات التطبيقية لإدارة العلاقة التربوية بكفاءة وبناء التأثير الإيجابي.",
        icon: Zap,
        courses: [
            {
                title: "حيث لا يكفي الكتاب",
                instructor: "عصام سلطان",
                lessons: "5 محاضرات",
                target: "المعلمين والأهالي",
                intro: "تحليل أزمة الخريج المعاصر وتربية الأبناء على مهارات الحياة الضرورية.",
                segments: ["لماذا ينجحون أكاديمياً ويفشلون واقعياً؟", "مهارات (المال، الضغوط، الهشاشة)", "استراتيجيات الحوار المنزلي البنّاء"],
                icon: Lightbulb
            },
            {
                title: "فخ التريند",
                instructor: "علي القواسمة",
                lessons: "6 محاضرات",
                target: "المعلمين والأهالي",
                intro: "مهارة التوقف مع التريندات والتحولات الرقمية بوعي تربوي ناقد.",
                segments: ["لماذا التفكير فيما حولي مصيري؟", "أضرار منهج 'التحول للقطيع'", "تربية الطلاب على النقد والتحليل"],
                icon: Rocket
            },
            {
                title: "العلوم بمتعة وانبهار",
                instructor: "مؤمن عمر",
                lessons: "تطبيقات ميدانية",
                target: "معلمي المواد العلمية",
                intro: "تحويل المادة العلمية الجامدة إلى تجربة مشوقة تربط العلم بالواقع.",
                segments: ["كسر جمود المعلومة العلمية", "التجربة كأداة تعليمية جاذبة", "إسقاطات العلم على مظاهر الحياة"],
                icon: Sparkles
            }
        ]
    },
    {
        id: "knowledge",
        title: "فئة الدورات المعرفية",
        intro: "معرفة راسخة بطابع تربوي. تزويد المربي بالمعرفة الإنسانية والشرعية ضمن طرحٍ تطبيقي لفهم الواقع وبناء الهوية.",
        icon: BookOpen,
        courses: [
            {
                title: "أساسات الجيل",
                instructor: "عصام سلطان",
                lessons: "7 محاضرات",
                target: "معلمي الروضة حتى الثامن",
                intro: "أركان الإيمان بطريقة عملية تطبيقية تحوّل العقيدة لمحرك سلوكي.",
                segments: ["العقيدة كعلاج للتنمر والضياع", "نواقض الإيمان في العصر الرقمي", "بناء الحصانة القرآنية أمام التريندات"],
                icon: ShieldCheck
            },
            {
                title: "مسلم واضح الرؤية",
                instructor: "علي القواسمه",
                lessons: "7 محاضرات",
                target: "كافة الفئات الميدانية",
                intro: "أركان الإسلام بطريقة عملية تربوية تؤسس للهوية المتوازنة.",
                segments: ["العبادة كفعل بناء الشخصية", "تطبيقات الصلاة والصيام في السلوك", "صناعة المسلم الواثق والمتزن"],
                icon: Compass
            },
            {
                title: "هندسة السلوك بالقصص",
                instructor: "عصام سلطان",
                lessons: "5 محاضرات",
                target: "معلمي الروضة حتى السابع",
                intro: "استعمال قصص الوحي لعلاج الأخلاق المذمومة والتنبيه على الفضائل.",
                segments: ["الفرق بين القصة التربوية وحكايا الوحي", "القصة كمرآة كاشفة للسلوك البشري", "أمثلة عملية لفرعون ويوسف وموسى"],
                icon: BookOpen
            }
        ]
    }
  ];

  return (
    <div className="bg-surface min-h-screen font-sans">
      <Navbar />
      <Hero />
      <About />
      <ProjectMasar />
      <Founders />
      
      <Section id="services" className="bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="دليل البرامج التدريبية" subtitle="نجمع بين التأصيل القيمي والمهارة العصرية لبناء مربٍّ متكامل." />
          
          {categories.map((cat) => (
            <div key={cat.id} className="mb-32">
              <div className="flex flex-col lg:flex-row items-center gap-8 mb-16 border-b border-slate-100 pb-16">
                <div className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl">
                    <cat.icon size={44} />
                </div>
                <div className="text-center lg:text-right">
                    <h3 className="text-4xl lg:text-5xl font-black text-primary mb-4">{cat.title}</h3>
                    <p className="text-xl text-slate-500 max-w-4xl font-medium">{cat.intro}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {cat.courses.map((course, i) => (
                  <CourseCard key={i} {...course} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Pricing />
      <Footer />
    </div>
  );
}
