import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { MapPin, Phone, Building2, Clock, Send, FileText, CheckCircle } from 'lucide-react';
import MapEmbed from './MapEmbed';
import './ContactPage.css';
import 'altcha/altcha.css';
import 'altcha';



interface ContactFormData {
    menoPriezvisko: string;
    nazovSpolocnosti: string;
    adresaSidlo: string;
    posta: string;
    email: string;
    mobil: string;
    cisloOP: string;
    program: string;
    viazanost: 's_viazanostou' | 'bez_viazanosti';
    poznamka: string;
    gdprSuhlas: boolean;
}

const INITIAL_FORM: ContactFormData = {
    menoPriezvisko: '',
    nazovSpolocnosti: '',
    adresaSidlo: '',
    posta: '',
    email: '',
    mobil: '',
    cisloOP: '',
    program: '',
    viazanost: 's_viazanostou',
    poznamka: '',
    gdprSuhlas: false,
};

const ContactPage: React.FC = () => {
    const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        
        if (!form.menoPriezvisko.trim()) newErrors.menoPriezvisko = 'Meno a priezvisko je povinné';
        if (!form.adresaSidlo.trim()) newErrors.adresaSidlo = 'Adresa je povinná';
        
        if (!form.posta.trim()) {
            newErrors.posta = 'PSČ je povinné';
        } else if (!/^\d{3} ?\d{2}$/.test(form.posta)) {
            newErrors.posta = 'Zadajte platné PSČ (napr. 086 41)';
        }

        if (!form.email.trim()) {
            newErrors.email = 'Email je povinný';
        } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
            newErrors.email = 'Zadajte platný email';
        }

        if (!form.mobil.trim()) newErrors.mobil = 'Mobilné číslo je povinné';
        if (!form.cisloOP.trim()) newErrors.cisloOP = 'Číslo OP alebo IČO je povinné';
        if (!form.program) newErrors.program = 'Vyberte si program';
        if (!form.gdprSuhlas) newErrors.gdprSuhlas = 'Musíte súhlasiť so spracovaním údajov';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const fieldName = name as keyof ContactFormData;

        // Clear error when user starts typing
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: undefined }));
        }

        if (type === 'checkbox') {
            setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            const firstError = document.querySelector('.error-text');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        
        const formDataObj = new FormData(e.currentTarget);
        const altchaPayload = formDataObj.get('altcha');

        if (!altchaPayload) {
            alert('Prosím, počkajte na overenie antispam ochrany (ALTCHA).');
            return;
        }

        const submitData = {
            ...form,
            altchaPayload: altchaPayload.toString()
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const err = await response.json();
                alert(err.message || 'Chyba pri odosielaní formulára.');
            }
        } catch (err) {
            console.error('Chyba pri odosielaní:', err);
            alert('Chyba pri komunikácii so serverom.');
        }
    };

    return (
        <div style={{ background: 'var(--bg-surface-light)', minHeight: '100vh', color: 'var(--text-primary)' }}>
            <Navbar />
            <div style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '5vw', paddingRight: '5vw' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-2px',
                            color: 'var(--text-primary)',
                            marginBottom: '1rem'
                        }}>Kontaktujte nás</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Sme tu pre Vás. Či už hľadáte spoľahlivý internet, potrebujete pomoc, alebo sa chcete na niečo opýtať.
                        </p>
                    </div>

                    {/* Contact info cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {/* Box 1: Kontaktné údaje */}
                        <div className="contact-card">
                            <h3 className="contact-card-title">
                                <Phone size={24} color="#0ea5e9" /> Spojte sa s nami
                            </h3>
                            <div>
                                <p className="contact-label">Telefón</p>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>054 / 321 18 80</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Zo zahraničia: +421 54 321 18 80</p>
                            </div>
                            <div>
                                <p className="contact-label">Emailové oddelenia</p>
                                <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}><strong>Všeobecné:</strong> internet@winet.sk</p>
                                <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}><strong>Technické:</strong> technicke@winet.sk</p>
                                <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}><strong>Ekonomické:</strong> ekonomicke@winet.sk</p>
                                <p style={{ fontSize: '1rem' }}><strong>Reklamácie:</strong> reklamacie@wi-net.sk</p>
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <p className="contact-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} /> Zákaznícka linka a SMS podpora
                                </p>
                                <p style={{ marginBottom: '0.5rem' }}>Po - Pia: 8:00 - 16:00</p>
                                <p style={{ fontSize: '0.95rem' }}><strong>SMS na poruchy (mimo prac. hodín):</strong><br /> 0948 409 609</p>
                            </div>
                        </div>

                        {/* Box 2: Firemné údaje */}
                        <div className="contact-card">
                            <h3 className="contact-card-title">
                                <Building2 size={24} color="#f97316" /> Fakturačné údaje
                            </h3>
                            <div>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>WI-NET s.r.o.</p>
                                <p style={{ color: 'var(--text-secondary)' }}>Hlavná 8/18</p>
                                <p style={{ color: 'var(--text-secondary)' }}>086 41 Raslavice</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                                <div>
                                    <p className="contact-label">IČO</p>
                                    <p>46 047 881</p>
                                </div>
                                <div>
                                    <p className="contact-label">DIČ</p>
                                    <p>2023223062</p>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <p className="contact-label">IČ DPH</p>
                                    <p>SK2023223062</p>
                                </div>
                            </div>
                        </div>

                        {/* Box 3: Mapa / Adresa */}
                        <div className="contact-card" style={{ overflow: 'hidden', padding: 0 }}>
                            <div style={{ padding: '2.5rem' }}>
                                <h3 className="contact-card-title">
                                    <MapPin size={24} color="#10b981" /> Nájdete nás tu
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Sme stabilným operátorom pre východné Slovensko so sídlom v Raslaviciach.</p>
                            </div>
                            {/* Map component with Cookie Consent Placeholder */}
                            <div style={{ flex: 1, position: 'relative', minHeight: '350px' }}>
                                <MapEmbed
                                    title="Mapa Winet Kontakt"
                                    src="https://www.google.com/maps/d/embed?mid=1z6NS47nRtqIrWriAD91iU3RFSZVpzgBF&ehbc=2E312F"
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ============================================ */}
                    {/* CONTRACT FORM – from original winet.sk page  */}
                    {/* ============================================ */}
                    <div className="contract-form-section">
                        <div className="contract-form-header">
                            <div className="contract-form-icon">
                                <FileText size={32} />
                            </div>
                            <h2 className="contract-form-title">Kontaktné informácie</h2>
                            <p className="contract-form-subtitle">
                                Na základe telefonického rozhovoru, prosím vypíšte tieto údaje, ktoré budú použité do Vašej zmluvy. 
                                Poskytnite preto údaje, na tú osobu, ktorá bude zúčastnená aj pri montáži. Ďakujeme.
                            </p>
                        </div>

                        {submitted ? (
                            <div className="form-success">
                                <CheckCircle size={48} />
                                <h3>Ďakujeme za odoslanie!</h3>
                                <p>Vaše údaje boli úspešne prijaté. Budeme Vás kontaktovať v čo najkratšom čase.</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }}
                                >
                                    Odoslať ďalší formulár
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contract-form">
                                {/* Row 1: Name + Company */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="menoPriezvisko" className="form-label">
                                            Meno a Priezvisko <span className="required">*</span>
                                        </label>
                                        <input
                                            id="menoPriezvisko"
                                            name="menoPriezvisko"
                                            type="text"
                                            className={`form-input ${errors.menoPriezvisko ? 'input-error' : ''}`}
                                            placeholder="Ján Novák"
                                            value={form.menoPriezvisko}
                                            onChange={handleChange}
                                        />
                                        {errors.menoPriezvisko && <span className="error-text">{errors.menoPriezvisko}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nazovSpolocnosti" className="form-label">
                                            Názov spoločnosti <span className="optional">(nepovinné)</span>
                                        </label>
                                        <input
                                            id="nazovSpolocnosti"
                                            name="nazovSpolocnosti"
                                            type="text"
                                            className="form-input"
                                            placeholder="Len pre právnické osoby"
                                            value={form.nazovSpolocnosti}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Address + Postal */}
                                <div className="form-row">
                                    <div className="form-group" style={{ flex: 2 }}>
                                        <label htmlFor="adresaSidlo" className="form-label">
                                            Adresa / Sídlo <span className="required">*</span>
                                        </label>
                                        <input
                                            id="adresaSidlo"
                                            name="adresaSidlo"
                                            type="text"
                                            className={`form-input ${errors.adresaSidlo ? 'input-error' : ''}`}
                                            placeholder="Ulica a číslo domu, obec"
                                            value={form.adresaSidlo}
                                            onChange={handleChange}
                                        />
                                        {errors.adresaSidlo && <span className="error-text">{errors.adresaSidlo}</span>}
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="posta" className="form-label">
                                            PSČ <span className="required">*</span>
                                        </label>
                                        <input
                                            id="posta"
                                            name="posta"
                                            type="text"
                                            className={`form-input ${errors.posta ? 'input-error' : ''}`}
                                            placeholder="086 41"
                                            value={form.posta}
                                            onChange={handleChange}
                                        />
                                        {errors.posta && <span className="error-text">{errors.posta}</span>}
                                    </div>
                                </div>

                                {/* Row 3: Email + Mobile */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            Email <span className="required">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                                            placeholder="vas@email.sk"
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobil" className="form-label">
                                            Mobil <span className="required">*</span>
                                        </label>
                                        <input
                                            id="mobil"
                                            name="mobil"
                                            type="tel"
                                            className={`form-input ${errors.mobil ? 'input-error' : ''}`}
                                            placeholder="0900 123 456"
                                            value={form.mobil}
                                            onChange={handleChange}
                                        />
                                        {errors.mobil && <span className="error-text">{errors.mobil}</span>}
                                    </div>
                                </div>

                                {/* Row 4: ID Number + Program */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="cisloOP" className="form-label">
                                            Číslo občianskeho preukazu / IČO <span className="required">*</span>
                                        </label>
                                        <input
                                            id="cisloOP"
                                            name="cisloOP"
                                            type="text"
                                            className={`form-input ${errors.cisloOP ? 'input-error' : ''}`}
                                            placeholder="AB123456 alebo IČO"
                                            value={form.cisloOP}
                                            onChange={handleChange}
                                        />
                                        {errors.cisloOP && <span className="error-text">{errors.cisloOP}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="program" className="form-label">
                                            Vyberte si program <span className="required">*</span>
                                        </label>
                                        <select
                                            id="program"
                                            name="program"
                                            className={`form-input form-select ${errors.program ? 'input-error' : ''}`}
                                            value={form.program}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>— Vyberte program —</option>
                                            <optgroup label="Optické programy">
                                                <option value="OPTIK START">OPTIK START - opticky internet</option>
                                                <option value="OPTIK KLASIK">OPTIK KLASIK - opticky internet</option>
                                                <option value="OPTIK PROFI">OPTIK PROFI - opticky internet</option>
                                            </optgroup>
                                            <optgroup label="Wifi programy">
                                                <option value="AC STANDARD">AC STANDARD - wifi internet</option>
                                                <option value="AC PROFI">AC PROFI - wifi internet</option>
                                                <option value="AC MAXI">AC MAXI - wifi internet</option>
                                            </optgroup>
                                        </select>
                                        {errors.program && <span className="error-text">{errors.program}</span>}
                                    </div>
                                </div>

                                {/* Viazanosť: radio buttons */}
                                <div className="form-group">
                                    <label className="form-label">Viazanosť programu</label>
                                    <div className="radio-group">
                                        <label className="radio-label" htmlFor="viazanost-s">
                                            <input
                                                id="viazanost-s"
                                                type="radio"
                                                name="viazanost"
                                                value="s_viazanostou"
                                                checked={form.viazanost === 's_viazanostou'}
                                                onChange={handleChange}
                                                className="radio-input"
                                            />
                                            <span className="radio-custom" />
                                            <span className="radio-text">s viazanosťou</span>
                                        </label>
                                        <label className="radio-label" htmlFor="viazanost-bez">
                                            <input
                                                id="viazanost-bez"
                                                type="radio"
                                                name="viazanost"
                                                value="bez_viazanosti"
                                                checked={form.viazanost === 'bez_viazanosti'}
                                                onChange={handleChange}
                                                className="radio-input"
                                            />
                                            <span className="radio-custom" />
                                            <span className="radio-text">bez viazanosti</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Poznámka */}
                                <div className="form-group">
                                    <label htmlFor="poznamka" className="form-label">
                                        Poznámka <span className="optional">(nepovinné)</span>
                                    </label>
                                    <textarea
                                        id="poznamka"
                                        name="poznamka"
                                        className="form-input form-textarea"
                                        placeholder="Vaša správa alebo doplňujúce informácie..."
                                        rows={4}
                                        value={form.poznamka}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* GDPR */}
                                <div className="form-group">
                                    <label className={`checkbox-label ${errors.gdprSuhlas ? 'input-error' : ''}`} htmlFor="gdprSuhlas">
                                        <input
                                            id="gdprSuhlas"
                                            type="checkbox"
                                            name="gdprSuhlas"
                                            checked={form.gdprSuhlas}
                                            onChange={handleChange}
                                            className="checkbox-input"
                                        />
                                        <span className="checkbox-custom" />
                                        <span className="checkbox-text">
                                            Zaškrtnutím tohto políčka a odoslaním tohto formulára udeľujem spoločnosti WI-NET s.r.o., 
                                            so sídlom Raslavice 8/18, 08641 Raslavice, IČO: 47 146 192, ako dotknutá osoba, 
                                            v zmysle zákona č. 18/2018 o ochrane osobných údajov a o zmene a doplnení niektorých zákonov, 
                                            súhlas so spracúvaním svojich osobných údajov v rozsahu celého dotazníka na účely vytvorenia 
                                            zmluvy so spoločnosťou WI-NET s.r.o.
                                        </span>
                                    </label>
                                    {errors.gdprSuhlas && <span className="error-text">{errors.gdprSuhlas}</span>}
                                </div>

                                {/* ALTCHA */}
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem', marginBottom: '1rem' }}>
                                    {React.createElement('altcha-widget', { 
                                        challenge: '/api/altcha/challenge' 
                                    } as React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { challenge: string }, HTMLElement>)}
                                </div>

                                {/* Submit */}
                                <div className="form-submit">
                                    <button type="submit" className="btn btn-primary btn-submit">
                                        <Send size={18} />
                                        Odoslať údaje
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
