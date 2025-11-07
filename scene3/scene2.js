const TILE_GRADIENTS = [
    { from: "#ff6b6b", to: "#ee5a6f", border: "rgba(255, 107, 107, 0.4)", glow: "rgba(255, 107, 107, 0.3)" },
    { from: "#4ecdc4", to: "#44a3a0", border: "rgba(78, 205, 196, 0.4)", glow: "rgba(78, 205, 196, 0.3)" },
    { from: "#a78bfa", to: "#8b5cf6", border: "rgba(167, 139, 250, 0.4)", glow: "rgba(167, 139, 250, 0.3)" },
    { from: "#34d399", to: "#10b981", border: "rgba(52, 211, 153, 0.4)", glow: "rgba(52, 211, 153, 0.3)" },
    { from: "#fbbf24", to: "#f59e0b", border: "rgba(251, 191, 36, 0.4)", glow: "rgba(251, 191, 36, 0.3)" },
    { from: "#ec4899", to: "#db2777", border: "rgba(236, 72, 153, 0.4)", glow: "rgba(236, 72, 153, 0.3)" },
    { from: "#60a5fa", to: "#3b82f6", border: "rgba(96, 165, 250, 0.4)", glow: "rgba(96, 165, 250, 0.3)" },
    { from: "#f472b6", to: "#ec4899", border: "rgba(244, 114, 182, 0.4)", glow: "rgba(244, 114, 182, 0.3)" },
    { from: "#2dd4bf", to: "#14b8a6", border: "rgba(45, 212, 191, 0.4)", glow: "rgba(45, 212, 191, 0.3)" },
    { from: "#fb923c", to: "#f97316", border: "rgba(251, 146, 60, 0.4)", glow: "rgba(251, 146, 60, 0.3)" },
  ];

   const MOCK_RESPONSES = [
    { id: "r1", answer: "AI that brought a smile amidst loss and grief also became the reason for a girl to end her life.", name: "Priya Sharma", occupation: "AI Ethics Researcher, India" , image: 'priya_sharma.jpeg',
       story: `
       "My father passed away when I was just 3 years old. I used AI to create photos of myself with my father, and it made me very happy."
Said Jouti, a college student from Haryana. “But on one end as it became a source of happiness to me, it had also been the reason for a young girl in my town to commit suiside. Some time ago, her face was used to create nude images, and everyone believed those nudes were real. It's hampering everyone's privacy." A strong weapon with no guardrail can do more harm than good.

"I'm not very hopeful about AI as a woman.” a girl from Patna shared reflecting on her witnessed experience of how rural women are especially targeted towards the misuse of AI, particularly with image generation, creating sexual content and blackmailing women. It is widely used to make negative content around women, and from the viewers' side, this is getting more reach too.

Just like Instagram AI trend reels go viral, awareness-related videos should also be popularly available so they reach everyone. From farmers to illiterate women and men in rural villages of India who don't have much digital knowledge often tend to become victims. They are not aware of security and privacy, so having proper educational content to raise awareness will help boost confidence, and they too will move forward with AI.
It’s high time the government shall run programs to raise awareness about security concerns related to AI. Global AI policy guidelines shall be determined with every country setting laws of punishment (fine or imprisonment) on committing crimes related to misuse of AI. Special international laws are needed to put a check on how the data collected from the masses are actually used by the AI companies and if the users have given consent on using their private information on training the Machine Learning Models. 

The same AI that can bring a smile amidst loss and grief can also be the reason for someone to end their life. The final call to use it is always in the hands of humans. So while making these systems we shall be thinking like humans, not machines.
       `},
    { id: "r2", answer: `AI's Impact on Employment: A Journalists Outlook`, name: "Anjali Mehta", occupation: "Data Scientist, Bangladesh" , 'image': 'priya_sharma2.jpeg',
       'story':`
       "People think AI is taking you one step forward when in reality it is taking you two steps backward.”

"I always wanted to create my identity through my own name. I didn't want anyone to call me 'so-and-so's daughter' or 'so-and-so's sister' or 'so-and-so's wife.' From the beginning, I wanted to be known by my own name and today, I've reached a point where people now know my family members by my name. I've endured bravery, self-dependence, and struggle, and today I've emerged as a fearless journalist. I'm originally from UP, living in Bihar alone for 3 years.” Shares Suman, a young Journalist from India. 

From her experience lately she also shares how AI is rapidly killing journalism because it has replaced scriptwriters. With just a few words, you get scripts written and thumbnails ready but the responses are very fabricated. This is ending realistic human output, especially in journalism.
AI creating images from news boardrooms, has even led to the decline of field reporting and field reporter roles. This has ended humans' potential to think critically. People just pick up their phones and start scrolling. They don't make an effort anymore, don't try to go where incidents are happening. Everything is available sitting at home.
This has eliminated employment opportunities for so many people, or their minds have just shrunk. People can't think deeply anymore.

"People think AI is taking you one step forward when in reality it is taking you two steps backward.”

Recently, the Bureau of Labor Statistics of America reported that 7.2-7.3 million people are unemployed due to AI and robots. From doctors performing surgeries to laborers in factories- AI is replacing humans. People find machines more reliable nowadays. But this has made people unemployed, which is very saddening. This online boost is breaking human relations.
       `},
    { id: "r3", answer: "Every algorithm carries the values of its creator. We must ask: whose values are we encoding?", name: "Fatima Khan", occupation: "Machine Learning Engineer, Pakistan", 'image': 'fatima_khan.jpg', 'story': 'Fatima’s journey into machine learning was driven by her desire to create technology that reflects diverse perspectives. She advocates for inclusive design practices that challenge biases in AI systems.' },
    { id: "r4", answer: "AI will transform work, but only if we ensure it creates opportunities rather than deepening divides.", name: "Lakshmi Reddy", occupation: "Tech Policy Advisor, Sri Lanka", 'image': 'lakshmi_reddy.jpg', 'story': 'Lakshmi’s passion for social justice led her to tech policy. She works to ensure that AI advancements lead to equitable job creation and do not exacerbate existing inequalities in the workforce.' },
    { id: "r5", answer: "The most powerful AI is the one that makes invisible labor visible and valued.", name: "Nisha Patel", occupation: "Social Impact Technologist, India" , 'image': 'nisha_patel.jpg', 'story': 'Nisha’s work focuses on leveraging AI to highlight and value the often-overlooked contributions of marginalized communities. She believes technology should serve as a tool for social empowerment.' },
    { id: "r6", answer: "We don't need perfect AI. We need fair AI that acknowledges its limitations and biases.", name: "Amara Singh", occupation: "Fairness Research Lead, Nepal" ,   'image': 'amara_singh.jpg', 'story': 'Amara’s research is dedicated to developing AI systems that prioritize fairness over perfection. She collaborates with communities to understand their needs and ensure AI technologies are equitable and just.' },
    { id: "r7", answer: "The real innovation is not in the model's accuracy, but in its accessibility to those who need it most.", name: "Zara Ahmed", occupation: "Community Tech Organizer, Pakistan",    'image': 'zara_ahmed.jpg', 'story': 'Zara’s grassroots work focuses on making AI technologies accessible to underserved communities. She believes that true innovation lies in democratizing access to technology for social good.' },
    { id: "r8", answer: "AI should be a bridge, not a barrier—connecting communities and preserving their knowledge.", name: "Riya Gupta", occupation: "Digital Anthropologist, India" ,   'image': 'riya_gupta.jpg', 'story': 'Riya’s background in anthropology drives her to explore how AI can preserve and connect cultural knowledge. She advocates for technologies that respect and enhance community heritage.' },
    { id: "r9", answer: "Every dataset tells a story. Our job is to ensure those stories include the voices left out.", name: "Maya Perera", occupation: "Data Justice Advocate, Sri Lanka",  'image': 'maya_perera.jpg', 'story': 'Maya’s advocacy work centers on data justice, ensuring that marginalized voices are represented in AI datasets. She works to highlight the stories behind the data and promote inclusive narratives.' },
    { id: "r10", answer: "The question isn't if AI will change society, but who gets to shape that change.", name: "Saima Malik", occupation: "Technology Activist, Bangladesh" , 'image': 'saima_malik.jpg', 'story': 'Saima’s activism focuses on empowering communities to have a say in how AI technologies are developed and deployed. She believes that inclusive participation is key to shaping a future where technology serves everyone.' },
  ];

  (function(){
      const cardsContainer = document.getElementById('cardsContainer');
      const slots = Array.from(document.querySelectorAll('.slot'));
      const collectionCountEl = document.getElementById('collectionCount');
      const body = document.body;
      const MAX = slots.length;
      let collected = [];

       function viewCollection(collected){
         
          localStorage.setItem('selected_collection', JSON.stringify(collected));
         
          window.location.href = 'scene3.html';
      }

      function updateUI(){
        if (collected.length === 4) {
            const div = document.createElement('div');
            div.className = "fixed bottom-8 left-1/2 -translate-x-1/2 p-6 rounded-2xl backdrop-blur-lg border border-[var(--accent-glow)]/50 bg-gradient-to-r from-[var(--accent-glow)]/20 to-[var(--deep-lilac)]/20 shadow-2xl max-w-md text-center";
            div.style.opacity = "1";
            div.style.transform = "none";
            div.innerHTML = `
                <div style="box-shadow: rgba(199, 184, 255, 0.573) 0px 0px 47.2243px;">
                    <p class="text-[var(--soft-light)] mb-2">Collection Complete! ✨</p>
                    <p class="text-sm text-[var(--water-silver)] opacity-80 mb-4">You've collected 4 resonant reflections</p>
                    <button class="view-collection w-full px-6 py-3 rounded-xl backdrop-blur-lg border border-[var(--accent-glow)]/60 bg-[var(--accent-glow)]/20 text-[var(--soft-light)] hover:bg-[var(--accent-glow)]/30 hover:border-[var(--accent-glow)]/80 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-glow)]/30" tabindex="0" style="transform: none;" >View Your Collection</button>
                </div>
            `;
            body.appendChild(div);
        }
        const viewCollectionBtn = document.querySelector('.view-collection');
          if(viewCollectionBtn)
          {
            viewCollectionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewCollection(collected);
          });
          }
          collectionCountEl.textContent = `${collected.length}/${MAX}`;
          slots.forEach((s, i) => {
              if (collected[i]) {
                  s.classList.add('filled');
                  s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-5 h-5 text-[var(--accent-glow)]" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>';
              } else {
                  s.classList.remove('filled');
                  s.textContent = '';
              }
          });
          
      }
      
     
      
      function createCard(response, index){
          const g = TILE_GRADIENTS[index % TILE_GRADIENTS.length];
          const card = document.createElement('div');
          card.className = 'card';
          card.setAttribute('data-author', response.name);
          card.id = `${response.id}`;
          card.tabIndex = 0;

          const frontStyle = ` background: linear-gradient(135deg, ${g.from}15, ${g.to}08); box-shadow: 0 10px 40px ${g.glow}, 0 0 20px ${g.glow}; border-color: ${g.border},`;
          const backStyle = `background: linear-gradient(135deg, ${g.from}25, ${g.to}15); border-color:  ${g.border}; box-shadow: 0 10px 40px ${g.glow}, 0 0 30px ${g.glow};`;

          card.innerHTML = `
              <div class="card-inner flex ">
                  <div class="face front" style="${frontStyle} absolute inset-0 p-6 rounded-2xl backdrop-blur-lg border shadow-xl">
                      <div claa="flex-1 flex items-center" style="margin:0; font-size:1rem; line-height:1.3; color:var(--soft-light); justify-self:center;">${response.answer}</div>
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                          <span class="tap-hint">Tap to reveal</span>
                          <span style="color:var(--water-silver); font-size:.9rem;"> ${response.id in collected ? 'Collected': ''}</span>
                      </div>
                  </div>

                  <div class="face back" style="${backStyle}">
                      <div style="text-align:center;">
                          <h3 style="margin:0 0 .25rem; color:var(--soft-light);">${response.name}</h3>
                          <p style="margin:0 0 1rem; color:var(--water-silver); font-size:.9rem;">${response.occupation}</p>
                          <p style="color:var(--water-silver); font-size:.9rem;">Collect this response to save it to your collection.</p>
                      </div>
                     <button  class="collect-btn w-full py-3 rounded-xl border transition-all duration-300" tabindex="0" style="  color: rgb(230, 240, 255); cursor: pointer;  transform: none;"><span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>Collect This Response</span></button>
                  </div>
              </div>
          `;
          return card;
      }

      
      MOCK_RESPONSES.forEach((r, i) => {
          const c = createCard(r, i);
          cardsContainer.appendChild(c);
      });

      
      const cards = Array.from(document.querySelectorAll('.card'));
      cards.forEach(card => {
        console.log(card);
          const btn = card.querySelector('.collect-btn');

          
          const setButtonState = () => {
              if (!btn) return;
              // already collected
              if (card.classList.contains('collected')) {
                  btn.disabled = true;
                  btn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>Collected</span>';
                  return;
              }

             
              if (collected.length >= MAX) {
                  btn.disabled = true;
                  btn.innerHTML = '<span class="flex items-center justify-center gap-2">Collection Limit Reached</span>';
                  return;
              }

              
              btn.disabled = false;
              btn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>Collect This Response</span>';
          };

          card.addEventListener('click', (e) => {
              if (btn && (e.target === btn || btn.contains(e.target))) return;
              const willFlipToBack = !card.classList.contains('is-flipped');
              card.classList.toggle('is-flipped');
              
              if (willFlipToBack) setButtonState();
          });

          card.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const willFlipToBack = !card.classList.contains('is-flipped');
                  card.classList.toggle('is-flipped');
                  if (willFlipToBack) setButtonState();
              }
          });

          if (btn) {
              btn.addEventListener('click', (e) => {
                  e.stopPropagation();
                  if (card.classList.contains('collected')) {
                      alert('Already collected');
                      return;
                  }
                  if (collected.length >= MAX) {
                      alert('Collection is full');
                      return;
                  }
                  response = MOCK_RESPONSES.find(r => r.id === card.id);
                  collected.push(response);
                  card.classList.add('collected');
                  btn.disabled = true;
                  btn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>Collected</span>';
                  card.classList.add('is-flipped');
                  // Store collection in localStorage whenever it changes
                  localStorage.setItem('girlswhoml_collection', JSON.stringify(collected));
                  updateUI();
                  console.log('Collected:', collected);
              });
          }
      });

      
     
      updateUI();
  })();