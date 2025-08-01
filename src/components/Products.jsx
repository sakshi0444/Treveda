// components/Products.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaLeaf, FaHeart, FaShieldAlt } from 'react-icons/fa';

// === Ensure these are transparent PNGs for the best look ===
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';

const productsData = [
    { id: 1, image: product5, name: 'Ashwagandha Powder', description: 'An ancient adaptogenic herb known to help manage stress and boost vitality.', benefits: ['Reduces Stress & Anxiety', 'Improves Vitality', 'Supports Cognitive Function'], howToUse: 'Mix one teaspoon with warm milk or water, preferably before bedtime.', category: 'Wellness', featured: true },
    { id: 2, image: product1, name: 'Multani Mitti Powder', description: 'A mineral-rich clay revered for deep cleansing and improving skin tone.', benefits: ['Deep Cleanses Pores', 'Controls Excess Oil', 'Brightens Complexion'], howToUse: 'Create a paste with rose water, apply to face, and wash off after 15 minutes.', category: 'Skincare' },
    { id: 3, image: product2, name: 'Moringa Powder', description: 'A nutritional powerhouse packed with antioxidants to nourish skin and promote a healthy glow.', benefits: ['Rich in Antioxidants', 'Nourishes Skin', 'Boosts Immunity'], howToUse: 'Add one scoop to your favorite smoothie, juice, or yogurt daily.', category: 'Nutrition' },
    { id: 4, image: product3, name: 'Orange Peel Powder', description: 'Rich in Vitamin C to naturally lighten blemishes and leave skin fresh and vibrant.', benefits: ['Natural Skin Brightener', 'Unclogs Pores', 'Reduces Acne & Blemishes'], howToUse: 'Mix with honey to form a rejuvenating face mask.', category: 'Skincare' },
    { id: 5, image: product4, name: 'Bhringraj Powder', description: 'A celebrated Ayurvedic herb, known for promoting hair growth and strength.', benefits: ['Promotes Hair Growth', 'Prevents Premature Graying', 'Reduces Dandruff'], howToUse: 'Make a paste with water or oil, apply to scalp and hair, and rinse after 30 minutes.', category: 'Hair Care' },
];

// This helper component injects all our CSS, including the responsive grid logic
const StyleInjector = () => (
    <style>{`
        @keyframes gradientAnimation { 
            0% { background-position: 0% 50%; } 
            50% { background-position: 100% 50%; } 
            100% { background-position: 0% 50%; } 
        }
        /* --- Responsive Grid Logic --- */
        .products-grid {
            display: grid;
            gap: 40px;
            /* Mobile First: 1 column */
            grid-template-columns: 1fr;
        }
        /* Tablet: 2 columns */
        @media (min-width: 640px) {
            .products-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            /* Center the last card if it's the 5th item */
            .products-grid > :last-child:nth-child(odd) {
                grid-column: span 2;
                justify-self: center;
            }
        }
        /* Desktop: 3 columns */
        @media (min-width: 1024px) {
            .products-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            /* Target the 4th and 5th items to center them */
            .products-grid > :nth-child(4) {
                grid-column-start: 1;
                grid-column-end: 3;
                justify-self: end;
                margin-right: -20px; /* Half the gap */
            }
            .products-grid > :nth-child(5) {
                grid-column-start: 2;
                grid-column-end: 4;
                justify-self: start;
                margin-left: -20px; /* Half the gap */
            }
            /* Reset the rule for the last child from tablet view */
             .products-grid > :last-child:nth-child(odd) {
                grid-column: auto;
                justify-self: auto;
            }
        }
    `}</style>
);

// --- Sub-component for each interactive card ---
const ProductCard = ({ product, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const yourWhatsAppNumber = '91XXXXXXXXXX';
    const generateWhatsAppLink = (productName) => `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(`Hello Treveda, I'm interested in purchasing the ${productName}.`)}`;

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'Wellness': return <FaHeart />;
            case 'Skincare': return <FaShieldAlt />;
            case 'Nutrition': return <FaLeaf />;
            case 'Hair Care': return <FaStar />;
            default: return <FaLeaf />;
        }
    };
    
    const handleInteraction = () => { if (isMobile) setIsFlipped(!isFlipped) };

    return (
        <motion.div
            ref={ref}
            style={styles.cardContainer}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: 'easeOut' }}
            onMouseEnter={() => !isMobile && setIsFlipped(true)}
            onMouseLeave={() => !isMobile && setIsFlipped(false)}
            onClick={handleInteraction}
        >
            <motion.div style={styles.cardInner} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
                <div style={{...styles.cardFace, ...styles.cardFront}}>
                    {product.featured && <div style={styles.featuredBadge}><FaStar style={styles.featuredIcon}/>Popular</div>}
                    <div style={styles.categoryTag}>{getCategoryIcon(product.category)}<span>{product.category}</span></div>
                    <div style={styles.imageContainer}><img src={product.image} alt={product.name} style={styles.productImage} /></div>
                    <div style={styles.cardContent}>
                        <h3 style={styles.productName}>{product.name}</h3>
                        <p style={styles.productDescription}>{product.description}</p>
                        <div style={styles.hoverHint}>{isMobile ? "Tap for details" : "Hover for details"}</div>
                    </div>
                </div>
                <div style={{...styles.cardFace, ...styles.cardBack}}>
                    <div style={styles.backContent}>
                        <div style={styles.detailsContainer}><h4 style={styles.detailsTitle}><FaStar style={styles.detailsIcon}/>Key Benefits</h4><ul style={styles.benefitsList}>{product.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
                        <div style={styles.detailsContainer}><h4 style={styles.detailsTitle}><FaLeaf style={styles.detailsIcon}/>How to Use</h4><p style={styles.howToUseText}>{product.howToUse}</p></div>
                        <a href={generateWhatsAppLink(product.name)} target="_blank" rel="noopener noreferrer" style={styles.buyButton}>Buy on WhatsApp</a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Main Products Component ---
const Products = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <>
            <StyleInjector />
            <section id="products" style={styles.sectionContainer}>
                <div style={styles.contentWrapper}>
                    <motion.div ref={headerRef} style={styles.headingContainer} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} >
                        <h2 style={styles.heading}>Our Natural Collection</h2>
                        <p style={styles.subheading}>Each product is a promise of purity and potency, backed by ancient wisdom.</p>
                    </motion.div>
                    <div className="products-grid">
                        {productsData.map((product, index) => ( <ProductCard key={product.id} product={product} index={index} /> ))}
                    </div>
                </div>
            </section>
        </>
    );
};

// --- STYLES OBJECT ---
const styles = {
    sectionContainer: { padding: '120px 20px', fontFamily: "'Inter', sans-serif", position: 'relative', zIndex: 1, overflow: 'hidden', background: 'linear-gradient(135deg, #cbdd9cff, #FBF9F6, #578768ff)', backgroundSize: '400% 400%', animation: 'gradientAnimation 20s ease infinite' },
    contentWrapper: { maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 },
    headingContainer: { textAlign: 'center', marginBottom: '80px' },
    heading: { fontFamily: "'Cormorant Garamond', serif", color: '#344e41', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.2 },
    subheading: { color: '#588157', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', maxWidth: '700px', margin: '20px auto 0', lineHeight: 1.6 },
    cardContainer: { perspective: '1200px', height: '480px', width: '100%', maxWidth: '360px', justifySelf: 'center' },
    cardInner: { position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' },
    cardFace: { position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(88, 129, 87, 0.1)', overflow: 'hidden' },
    cardFront: {},
    cardBack: { transform: 'rotateY(180deg)' },
    featuredBadge: { position: 'absolute', top: '15px', right: '15px', backgroundColor: '#344e41', color: '#FFFFFF', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 10 },
    featuredIcon: { fontSize: '0.7rem' },
    categoryTag: { position: 'absolute', top: '15px', left: '15px', backgroundColor: 'rgba(88, 129, 87, 0.1)', color: '#344e41', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 10 },
    imageContainer: { backgroundColor: '#F7F9F5', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', height: '220px' },
    productImage: { width: '75%', maxHeight: '180px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))' },
    cardContent: { padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' },
    productName: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#344e41', marginBottom: '10px' },
    productDescription: { fontSize: '1rem', lineHeight: 1.6, color: '#588157', marginBottom: '15px' },
    hoverHint: { marginTop: 'auto', fontSize: '0.85rem', color: '#588157', fontStyle: 'italic', opacity: 0.8 },
    backContent: { display: 'flex', flexDirection: 'column', height: '100%', padding: '30px', justifyContent: 'center' },
    detailsContainer: { textAlign: 'left', marginBottom: '20px' },
    detailsTitle: { fontWeight: '700', fontSize: '1rem', color: '#344e41', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' },
    detailsIcon: { color: '#588157', fontSize: '0.9rem' },
    benefitsList: { padding: 0, margin: 0, listStyle: 'none' },
    howToUseText: { fontSize: '0.9rem', lineHeight: 1.6, color: '#588157' },
    buyButton: { padding: '15px 30px', borderRadius: '25px', background: 'linear-gradient(135deg, #344e41 0%, #588157 100%)', color: '#FFFFFF', textDecoration: 'none', fontWeight: '600', textAlign: 'center', border: 'none', cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 5px 15px rgba(52, 78, 65, 0.3)', marginTop: 'auto' },
};

export default Products;