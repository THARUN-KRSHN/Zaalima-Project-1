import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import AccountStats from '../../components/profile/AccountStats';
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileForm from '../../components/profile/ProfileForm';

// 🌟 DATA INTERFACE REGISTRY OBJECT (No hardcoded strings inside JSX elements)
const CORE_PROFILE_SCHEMA_REGISTRY = {
    labels: {
        pageTitle: "Account Settings",
        pageSubtitle: "Configure verification metrics, rotate validation secrets, and monitor your multi-tenant parameters.",
        backActionLabel: "Back to Dashboard",
        roleBadgeText: "Access Authorization Tier",
        personalSectionTitle: "Identity Attributes Identification",
        passwordSectionTitle: "Authentication Token Cryptography Secrets",
        nameLabel: "Full Name Mapping",
        phoneLabel: "Phone Network Routing Number",
        emailLabel: "Corporate Email Address",
        currentPassLabel: "Active Private Key Password",
        newPassLabel: "Target Replacement Hash Pass",
        confirmPassLabel: "Confirm Target Password Vector",
        editBtnText: "Save Profile Constraints",
        updatePassBtnText: "Rotate Secret Password Tokens"
    },
    // User Context Summary (Matches user context info logs)
    userData: {
        fullName: "Tharun Krishna C U",
        email: "tharun@zmarket.com",
        phone: "9778585423",
        role: "customer",
        avatarText: "TK"
    },
    // Task 3 Overview Counters Metrics Metadata
    accountOverviewStats: [
        { label: "Total Orders Processed", value: "14 Records" },
        { label: "Active Wishlist Items", value: "29 Inclusions" },
        { label: "Saved Physical Addresses", value: "2 Node Locations" }
    ]
};

export default function Profile({ isDarkMode, onToggleTheme }) {
    const navigate = useNavigate();
    const config = CORE_PROFILE_SCHEMA_REGISTRY;

    return (
        <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center select-none font-sans antialiased text-left selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)]">
            <Navbar isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

            <main className="w-full max-w-[1280px] px-4 sm:px-8 lg:px-16 py-10 flex flex-col gap-8 flex-grow">
                {/* Back Link Wrapper */}
                <button
                    onClick={() => navigate('/orders')}
                    className="w-fit text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-2 focus:outline-none transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{config.labels.backActionLabel}</span>
                </button>

                {/* Primary Branding Text Segment */}
                <div className="flex flex-col gap-1.5 max-w-2xl">
                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white">
                        {config.labels.pageTitle}
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                        {config.labels.pageSubtitle}
                    </p>
                </div>

                {/* Task 3: Account Overview Statistics Strip Row */}
                <AccountStats stats={config.accountOverviewStats} labels={config.labels} />

                {/* Main Two-Column Identity Management Workspace Section Block */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start mt-2">

                    {/* Left Frame Avatar Section */}
                    <div className="w-full lg:col-span-1">
                        <ProfileCard user={config.userData} labels={config.labels} />
                    </div>

                    {/* Right Frame Details Forms Section */}
                    <div className="w-full lg:col-span-2">
                        <ProfileForm user={config.userData} labels={config.labels} />
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}