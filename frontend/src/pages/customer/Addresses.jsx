import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import AddressCard from '../../components/profile/AddressCard';
import AddressForm from '../../components/profile/AddressForm';
import DeleteModal from '../../components/profile/DeleteModal';

// 🌟 DATA CORE REGISTRY LABELS (Zero raw values inside JSX elements)
const GLOBAL_ADDRESSES_DATA_REGISTRY = {
    labels: {
        title: "Shipping Address Management",
        subtitle: "Manipulate multi-tenant location dispatches, anchor delivery profiles, and verify destination node paths.",
        backLabel: "Return to Profile Matrix",
        addBtnText: "Register New Address Node",
        emptyFeedMsg: "No physical dispatch coordinates registered inside this session token profile.",
        addFormTitle: "Initialize Destination Parameter Block",
        editFormTitle: "Mutate Location Node Metrics",
        nameLabel: "Recipient Name",
        phoneLabel: "Phone Number Mapping",
        addressLabel: "Physical Street Address Line",
        cityLabel: "City Node",
        stateLabel: "State Region",
        pincodeLabel: "Postal Pincode Token",
        saveBtnText: "Commit Address Node",
        cancelBtnText: "Abort Operation",
        modalHeader: "Confirm Entry Dropping",
        modalDesc: "Are you certain you wish to purge this location parameter vector share out of your platform registry?",
        modalCancelText: "Abort Drop",
        modalConfirmText: "Purge Entry Permanently"
    },
    // Simulated Database List matching user summaries data metrics
    initialAddressDataset: [
        { id: "adr-1", type: "home", name: "Tharun Krishna C U", phone: "9778585423", addressLine: "Christ College Road", city: "Irinjalakuda", state: "Kerala", pincode: "680125" },
        { id: "adr-2", type: "office", name: "IEDC Operational Cell", phone: "9778585423", addressLine: "Christ College of Engineering Campus", city: "Irinjalakuda", state: "Kerala", pincode: "680125" }
    ]
};

export default function Addresses({ isDarkMode, onToggleTheme }) {
    const navigate = useNavigate();
    const { labels, initialAddressDataset } = GLOBAL_ADDRESSES_DATA_REGISTRY;

    const [addresses, setAddresses] = useState(initialAddressDataset);
    const [defaultId, setDefaultId] = useState("adr-1");
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const handleSave = (formPayload) => {
        if (editingAddress) {
            setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...formPayload, id: editingAddress.id } : a));
        } else {
            setAddresses([...addresses, { ...formPayload, id: `adr-${Date.now()}` }]);
        }
        setShowForm(false);
        setEditingAddress(null);
    };

    const handleDeleteConfirm = () => {
        setAddresses(addresses.filter(a => a.id !== deleteId));
        if (defaultId === deleteId && addresses.length > 1) setDefaultId(addresses.find(a => a.id !== deleteId).id);
        setDeleteId(null);
    };

    return (
        <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center select-none font-sans antialiased text-left selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)]">
            <Navbar isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

            <main className="w-full max-w-[1280px] px-4 sm:px-8 lg:px-16 py-10 flex flex-col gap-8 flex-grow">
                <button onClick={() => navigate('/profile')} className="w-fit text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-2 focus:outline-none transition-colors cursor-pointer">
                    <ArrowLeft className="w-4 h-4" /><span>{labels.backLabel}</span>
                </button>

                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5">
                    <div className="flex flex-col gap-1.5 max-w-xl">
                        <h1 className="text-2xl sm:text-4xl font-black text-stone-950 dark:text-white tracking-tight">{labels.title}</h1>
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed">{labels.subtitle}</p>
                    </div>
                    {!showForm && (
                        <button onClick={() => { setEditingAddress(null); setShowForm(true); }} className="h-11 px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0 focus:outline-none">
                            <Plus className="w-4 h-4" /><span>{labels.addBtnText}</span>
                        </button>
                    )}
                </div>

                {showForm ? (
                    <div className="max-w-2xl w-full">
                        <AddressForm initialData={editingAddress} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingAddress(null); }} labels={labels} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
                        {addresses.length > 0 ? (
                            addresses.map((address) => (
                                <AddressCard
                                    key={address.id}
                                    address={address}
                                    isDefault={defaultId === address.id}
                                    onSelectDefault={() => setDefaultId(address.id)}
                                    onEdit={() => { setEditingAddress(address); setShowForm(true); }}
                                    onDelete={() => setDeleteId(address.id)}
                                    labels={labels}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center border border-dashed border-[var(--border-light)] rounded-2xl font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-surface)]/20 flex flex-col items-center justify-center gap-2">
                                <MapPin className="w-5 h-5 text-[var(--text-muted)]" /><span>{labels.emptyFeedMsg}</span>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Confirmation Dropping Portal overlay */}
            <DeleteModal isOpen={deleteId !== null} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteId(null)} labels={labels} />
            <Footer />
        </div>
    );
}