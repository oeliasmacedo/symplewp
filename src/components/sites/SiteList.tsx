import React from 'react';
import { useWordPress } from '../../contexts/WordPressContext';
import { Globe, Check, X, ExternalLink, Trash2 } from 'lucide-react';

export function SiteList() {
  const { sites, currentSite, setCurrentSite, removeSite } = useWordPress();

  const handleSiteSelect = (siteId: string) => {
    const site = sites.find(s => s.id === siteId);
    if (site) {
      setCurrentSite(site);
    }
  };

  const handleRemoveSite = (siteId: string) => {
    if (window.confirm('Tem certeza que deseja remover este site?')) {
      removeSite(siteId);
    }
  };

  if (sites.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <Globe className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhum site conectado</h3>
        <p className="mt-1 text-sm text-gray-500">
          Comece adicionando seu primeiro site WordPress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sites.map((site) => (
        <div
          key={site.id}
          className={`flex items-center justify-between p-4 rounded-lg border ${
            currentSite?.id === site.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              site.status === 'active' ? 'bg-green-500' : 
              site.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            <div>
              <h3 className="text-sm font-medium text-gray-900">{site.name}</h3>
              <p className="text-sm text-gray-500">{site.url}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSiteSelect(site.id)}
              className={`px-3 py-1 text-sm rounded-md ${
                currentSite?.id === site.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {currentSite?.id === site.id ? (
                <>
                  <Check className="inline-block w-4 h-4 mr-1" />
                  Selecionado
                </>
              ) : (
                'Selecionar'
              )}
            </button>

            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-gray-500"
              title="Abrir site"
            >
              <ExternalLink className="w-5 h-5" />
            </a>

            <button
              onClick={() => handleRemoveSite(site.id)}
              className="p-1 text-red-400 hover:text-red-500"
              title="Remover site"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 