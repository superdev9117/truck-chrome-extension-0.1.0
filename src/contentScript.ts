export {};

interface Modal {
  open: (mapUrl: string) => void;
  close: () => void;
}

interface MutationObserverConfig {
  childList: boolean;
  subtree: boolean;
}

const modalTemplate = (): string => `
  <div id="mapModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <iframe id="mapIframe" src="" style="width:100%;height:400px;border:none;"></iframe>
    </div>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', modalTemplate());

const style = document.createElement('style');
style.textContent = `
  #mapModal.modal {
    display: none;
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 1020;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
  }

  #mapModal .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 100%;
    max-width: 600px; 
  }

  #mapModal .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  #mapModal .close:hover,
  #mapModal .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;
document.head.appendChild(style);

const makeModal = (): Modal => {
  const modal = document.getElementById('mapModal') as HTMLElement;
  const mapIframe = document.getElementById('mapIframe') as HTMLIFrameElement;

  return {
    open: (mapUrl: string) => {
      mapIframe.src = mapUrl;
      modal.style.display = 'flex';
    },
    close: () => {
      modal.style.display = 'none';
      mapIframe.src = '';
    },
  };
};

const modal: Modal = makeModal();

window.onclick = (event: MouseEvent) => {
  const modalElement = document.getElementById('mapModal');
  if (event.target === modalElement) {
    modal.close();
  }
};

document.querySelector('.close')?.addEventListener('click', () => {
  modal.close();
});

const addMapLinks = () => {
  const getLoadBoard = (
    element: Element | Document,
    className: string
  ): Element[] => {
    return Array.from(element.querySelectorAll(`*[class*="${className}"]`));
  };

  const rows = getLoadBoard(
    document,
    'PostTruckExtraCardItem-module-postTruckExtraCardItem'
  );

  rows.forEach((row) => {
    const locations = getLoadBoard(row, 'TruckCell-module-place');
    const existingMapLink = getLoadBoard(row, 'Truckcell-module-maplink');

    if (locations.length > 0 && existingMapLink.length === 0) {
      const pickupLocation = locations[0].textContent?.trim();
      const dropoffLocation = locations[2]?.textContent?.trim();
      if (pickupLocation && dropoffLocation) {
        const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyD3Srz6dpiK1Pl6CcC9r5ZfVQ9XXCJ6sWs&origin=${encodeURIComponent(
          pickupLocation
        )}&destination=${encodeURIComponent(dropoffLocation)}`;
        const mapLink = document.createElement('a');
        mapLink.href = mapUrl;
        mapLink.target = '_blank';
        mapLink.textContent = 'View Route';
        Object.assign(mapLink.style, {
          marginLeft: '10px',
          fontSize: '12px',
          lineHeight: '20px',
          fontWeight: '600',
        });
        mapLink.className = 'Truckcell-module-maplink';

        mapLink.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          modal.open(mapUrl);
        });

        const detailsDiv = getLoadBoard(
          getLoadBoard(row, 'TruckCell-module-bottom')[0],
          'TruckCell-module-hstack'
        )[0];
        if (detailsDiv) {
          detailsDiv.appendChild(mapLink);
        }
      }
    }
  });
};

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      addMapLinks();
    }
  });
});

const targetNode = document.body;
const config: MutationObserverConfig = { childList: true, subtree: true };

window.addEventListener('load', () => {
  addMapLinks();
  observer.observe(targetNode, config);
});
