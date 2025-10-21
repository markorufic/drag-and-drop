const dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.style.borderColor = 'green';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = '#ccc';
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.style.borderColor = '#ccc';
  const files = event.dataTransfer.files;
  
  if (files.length > 0) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      
      // Handle images
      if (file.type.startsWith('image/')) {
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '200px';
          img.style.margin = '10px';
          dropZone.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
      
      // Handle audio files
      else if (file.type.startsWith('audio/')) {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.style.margin = '10px';
        audio.src = URL.createObjectURL(file);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'media-preview';
        wrapper.innerHTML = `<p><strong>${file.name}</strong></p>`;
        wrapper.appendChild(audio);
        dropZone.appendChild(wrapper);
      }
      
      // Handle video files
      else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.controls = true;
        video.style.maxWidth = '300px';
        video.style.margin = '10px';
        video.src = URL.createObjectURL(file);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'media-preview';
        wrapper.innerHTML = `<p><strong>${file.name}</strong></p>`;
        wrapper.appendChild(video);
        dropZone.appendChild(wrapper);
      }
      
      // Handle text documents
      else if (file.type === 'text/plain' || 
               file.type === 'application/msword' ||
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
               file.type === 'application/pdf') {
        reader.onload = function(e) {
          const div = document.createElement('div');
          div.className = 'document-preview';
          div.innerHTML = `
            <p><strong>${file.name}</strong></p>
            <p>Type: ${file.type}</p>
            <p>Size: ${file.size} bytes</p>
          `;
          dropZone.appendChild(div);
        };
        reader.readAsText(file);
      }
    });
  }
});

dropZone.addEventListener('dragenter', (event) => {
  event.preventDefault();
});

// Optional: Make the drop zone accept text data
dropZone.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text', 'This text was dragged!');
});

