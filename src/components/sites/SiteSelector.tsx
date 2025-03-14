import React, { useState } from 'react';
import { useWordPress } from '../../contexts/WordPressContext';
import { ChevronDown, Globe, Plus } from 'lucide-react';
import { AddSiteForm } from './AddSiteForm';

export function SiteSelector() {
  const { sites, currentSite, setCurrentSite } = useWordPress();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAddSiteForm, setShowAddSiteForm] = useState(false);

  const handleSiteSelect = (siteId: string) => {
    const site = sites.find(s => s.id === siteId);
    if (site) {
      setCurrentSite(site);
      setIsDropdownOpen(false);
    }
  };

  if (showAddSiteForm) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Adicionar Novo Site</h2>
        <AddSiteForm
          onSuccess={() => setShowAddSiteForm(false)}
          onCancel={() => setShowAddSiteForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
      >
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-gray-400" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">
              {currentSite?.name || 'Selecione um site'}
            </p>
            {currentSite && (
              <p className="text-xs text-gray-500">{currentSite.url}</p>
            )}
          </div>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg">
          <div className="py-1">
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => handleSiteSelect(site.id)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  currentSite?.id === site.id ? 'bg-blue-50' : ''
                }`}
              >
                <p className="text-sm font-medium text-gray-900">{site.name}</p>
                <p className="text-xs text-gray-500">{site.url}</p>
              </button>
            ))}

            <button
              onClick={() => {
                setIsDropdownOpen(false);
                setShowAddSiteForm(true);
              }}
              className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar novo site</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 