export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    publish_date: string;
    read_time: string;
    featured_image: string;
    excerpt: string;
    content: string;
}

export const dummyPosts: BlogPost[] = [
    {
        id: 1,
        title: "Nursing Jobs In Canada 2026: Visa Sponsorship, Salary & How to Apply",
        slug: "nursing-jobs-canada-2026",
        category: "Immigration",
        author: {
            name: "Meghna K",
            role: "Immigration Content Expert",
            avatar: "https://i.pravatar.cc/150?u=meghna",
        },
        publish_date: "Feb 7, 2026",
        read_time: "11 min read",
        featured_image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000",
        excerpt: "Imagine a career where your nursing skills open doors to Canada's stunning landscapes and world-class hospitals...",
        content: `
            <p>Imagine a career where your nursing skills open doors to Canada's stunning landscapes and world-class hospitals, where you're valued as most advanced. Canada. In 2024, over 60,000 nursing roles await due to an aging population and growing healthcare investments. Skilled professionals from India can assess visa sponsorship, start gurus salaries, and a path to permanent residency. If you're looking for nursing jobs in Canada for Indian nurses, whether as a Registered Nurse, LPN, or NP, your gentlemen turn into a magician's future. Let's dive into this blog and explore how.</p>

            <div class="table-of-contents mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 class="text-xl font-bold mb-4">Table Of Content</h3>
                <ul class="space-y-3">
                    <li class="flex items-center gap-3">
                        <span class="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded text-xs font-bold">1</span>
                        <span>Types of Nursing Jobs in Canada</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded text-xs font-bold">2</span>
                        <span>Nursing Jobs in Canada</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded text-xs font-bold">3</span>
                        <span>Nursing Jobs in Canada with Visa Sponsorship</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded text-xs font-bold">4</span>
                        <span>Nursing Salary in Canada</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded text-xs font-bold">5</span>
                        <span>Nursing job in Canada Requirements</span>
                    </li>
                </ul>
            </div>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-gray-900 font-heading">Types of Nursing Jobs in Canada</h2>
            <p>Nursing Jobs in Canada include a wide range of roles from entry-level support to advanced specialties, meeting diverse healthcare needs across hospitals, clinics, and communities.</p>
            <p class="mt-4 font-bold">Types of Nursing Jobs in Canada includes:</p>
            <ul class="list-disc ml-6 mt-4 space-y-2">
                <li>Registered Nurse (RN)</li>
                <li>Licensed Practical Nurses (LPN) / Registered Practical Nurses (RPN)</li>
                <li>Nurse Practitioner (NP)</li>
                <li>Registered Psychiatric Nurse (RPN)</li>
                <li>Nurse Aide/Health Care Assistant</li>
            </ul>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-gray-900 font-heading">Nursing Jobs in Canada</h2>
            <p>Nursing jobs in Canada offer immense opportunities for skilled professionals, with high demand driven by an aging population, healthcare expansions, and persistent staffing shortages projected through 2026, making them some of the most in-Demand Jobs in Canada.</p>

            <h3 class="text-2xl font-bold mt-8 mb-4 text-red-600 font-heading">1. Registered Nurse (RN)</h3>
            <p>Registered Nurses (RNs) are essential pillars of Canada's healthcare system, providing direct patient care, coordinating treatments, and ensuring patient safety across various settings. High demand stems from an aging population, healthcare expansions, and chronic staffing shortages expected to persist through 2026. They work in hospitals, clinics, long-term care facilities, and community health centers.</p>
            
            <h4 class="text-xl font-bold mt-6 mb-2 text-red-600 font-heading">Registered Nurse Job Description</h4>
            <ul class="list-disc ml-6 mt-2 space-y-2">
                <li>Perform patient assessments and develop individualized care plans.</li>
                <li>Administer medications, IVs, and assist in procedures.</li>
                <li>Collaborate with multidisciplinary teams for holistic care.</li>
                <li>Educate patients and families on disease management.</li>
                <li>Document care and adhere to provincial regulations.</li>
            </ul>

            <h4 class="text-xl font-bold mt-6 mb-2 text-red-600 font-heading">How to Become a Registered Nurse in Canada</h4>
            <ol class="list-decimal ml-6 mt-2 space-y-2">
                <li>Complete a BSN or equivalent (4 years).</li>
                <li>Pass the NCLEX-RN exam.</li>
                <li>Register with provincial college (e.g., CNO, BCCNP).</li>
                <li>For International Applicants: Use NNAS for credential assessment, prove language proficiency (IELTS 7+), complete bridging if needed, and pursue Express Entry visa.</li>
            </ol>
        `
    },
    {
        id: 2,
        title: "Creating Demand for Psychiatrists in Canada",
        slug: "demand-psychiatrists-canada",
        category: "Immigration",
        author: {
            name: "Sreelakshmi R Dayal R",
            role: "Content Creator",
            avatar: "https://i.pravatar.cc/150?u=sree",
        },
        publish_date: "Feb 5, 2026",
        read_time: "8 min read",
        featured_image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=2000",
        excerpt: "The mental health landscape in Canada is evolving, leading to a surge in demand for qualified psychiatrists...",
        content: "<p>Dummy content for psychiatrists...</p>"
    },
    {
        id: 3,
        title: "Best Public Universities in Germany for International Students in 2024",
        slug: "public-universities-germany-2024",
        category: "Education",
        author: {
            name: "Anjana Harisankar",
            role: "Education Consultant",
            avatar: "https://i.pravatar.cc/150?u=anjana",
        },
        publish_date: "Feb 2, 2026",
        read_time: "15 min read",
        featured_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000",
        excerpt: "Germany remains a top destination for international students, offering world-class education with little to no tuition fees...",
        content: "<p>Dummy content for Germany universities...</p>"
    }
];
