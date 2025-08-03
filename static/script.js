// Global variables
let selectedFile = null;
let selectedAction = null;

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const processingOptions = document.getElementById('processingOptions');
const parametersSection = document.getElementById('parametersSection');
const processingStatus = document.getElementById('processingStatus');
const resultsSection = document.getElementById('resultsSection');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Option cards click
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            selectOption(this.dataset.action);
        });
    });
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFileSelection(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processFileSelection(files[0]);
    }
}

function processFileSelection(file) {
    // Validate file type
    if (!file.type.startsWith('audio/')) {
        alert('Please select an audio file');
        return;
    }
    
    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
    }
    
    selectedFile = file;
    
    // Update UI
    uploadArea.style.display = 'none';
    processingOptions.style.display = 'block';
    
    // Update upload area to show selected file
    const uploadContent = uploadArea.querySelector('.upload-content');
    uploadContent.innerHTML = `
        <i class="fas fa-file-audio upload-icon"></i>
        <h3>${file.name}</h3>
        <p>Size: ${formatFileSize(file.size)}</p>
        <button class="upload-btn" onclick="resetUpload()">
            <i class="fas fa-times"></i> Remove File
        </button>
    `;
}

function selectOption(action) {
    selectedAction = action;
    
    // Update option cards UI
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-action="${action}"]`).classList.add('selected');
    
    // Show parameters section
    setTimeout(() => {
        showParametersForm(action);
    }, 300);
}

function showParametersForm(action) {
    processingOptions.style.display = 'none';
    parametersSection.style.display = 'block';
    
    const parametersTitle = document.getElementById('parametersTitle');
    const parametersForm = document.getElementById('parametersForm');
    
    let title, formHTML;
    
    switch(action) {
        case 'remove-vocals':
            title = 'Vocal Removal Settings';
            formHTML = `
                <div class="parameter-group">
                    <label for="outputFormat">Output Format</label>
                    <select id="outputFormat">
                        <option value="mp3">MP3</option>
                        <option value="wav">WAV</option>
                        <option value="flac">FLAC</option>
                    </select>
                </div>
                <div class="parameter-group">
                    <label for="quality">Quality</label>
                    <select id="quality">
                        <option value="high">High Quality</option>
                        <option value="medium" selected>Medium Quality</option>
                        <option value="low">Low Quality (Faster)</option>
                    </select>
                </div>
            `;
            break;
            
        case 'pitch-tempo':
            title = 'Pitch & Tempo Adjustment';
            formHTML = `
                <div class="parameter-row">
                    <div class="parameter-group">
                        <label for="pitchShift">Pitch Shift (semitones)</label>
                        <input type="number" id="pitchShift" value="0" min="-12" max="12" step="0.1">
                    </div>
                    <div class="parameter-group">
                        <label for="tempoChange">Tempo Change (multiplier)</label>
                        <input type="number" id="tempoChange" value="1.0" min="0.5" max="2.0" step="0.1">
                    </div>
                </div>
                <div class="parameter-group">
                    <label for="preserveFormants">Preserve Formants</label>
                    <select id="preserveFormants">
                        <option value="true">Yes (Better for vocals)</option>
                        <option value="false">No (Faster processing)</option>
                    </select>
                </div>
            `;
            break;
            
        case 'convert-format':
            title = 'Format Conversion';
            formHTML = `
                <div class="parameter-row">
                    <div class="parameter-group">
                        <label for="targetFormat">Target Format</label>
                        <select id="targetFormat">
                            <option value="mp3">MP3</option>
                            <option value="wav">WAV</option>
                            <option value="flac">FLAC</option>
                            <option value="aac">AAC</option>
                            <option value="ogg">OGG</option>
                            <option value="m4a">M4A</option>
                        </select>
                    </div>
                    <div class="parameter-group">
                        <label for="bitrate">Bitrate (kbps)</label>
                        <select id="bitrate">
                            <option value="128">128 kbps</option>
                            <option value="192">192 kbps</option>
                            <option value="256">256 kbps</option>
                            <option value="320" selected>320 kbps</option>
                        </select>
                    </div>
                </div>
                <div class="parameter-group">
                    <label for="sampleRate">Sample Rate (Hz)</label>
                    <select id="sampleRate">
                        <option value="22050">22,050 Hz</option>
                        <option value="44100" selected>44,100 Hz</option>
                        <option value="48000">48,000 Hz</option>
                        <option value="96000">96,000 Hz</option>
                    </select>
                </div>
            `;
            break;
            
        case 'cut-join':
            title = 'Cut & Join Audio';
            formHTML = `
                <div class="parameter-group">
                    <label for="operation">Operation</label>
                    <select id="operation" onchange="toggleCutJoinOptions()">
                        <option value="cut">Cut Audio</option>
                        <option value="join">Join Audio</option>
                    </select>
                </div>
                <div id="cutOptions">
                    <div class="parameter-row">
                        <div class="parameter-group">
                            <label for="startTime">Start Time (seconds)</label>
                            <input type="number" id="startTime" value="0" min="0" step="0.1">
                        </div>
                        <div class="parameter-group">
                            <label for="endTime">End Time (seconds)</label>
                            <input type="number" id="endTime" placeholder="Leave empty for end" min="0" step="0.1">
                        </div>
                    </div>
                </div>
                <div id="joinOptions" style="display: none;">
                    <div class="parameter-group">
                        <label for="joinFile">Second Audio File</label>
                        <input type="file" id="joinFile" accept="audio/*">
                    </div>
                </div>
            `;
            break;
            
        case 'reduce-noise':
            title = 'Noise Reduction';
            formHTML = `
                <div class="parameter-group">
                    <label for="noiseReductionStrength">Noise Reduction Strength</label>
                    <input type="range" id="noiseReductionStrength" min="0.1" max="1.0" value="0.5" step="0.1">
                    <span class="range-value">0.5</span>
                </div>
                <div class="parameter-group">
                    <label for="preserveMusic">Preserve Music Quality</label>
                    <select id="preserveMusic">
                        <option value="true" selected>Yes (Recommended)</option>
                        <option value="false">No (Aggressive noise removal)</option>
                    </select>
                </div>
            `;
            break;
            
        case 'play-audio':
            title = 'Audio Player';
            formHTML = `
                <div class="parameter-group">
                    <label>Audio will be prepared for streaming</label>
                    <p style="color: #666; font-size: 0.9rem;">
                        Your audio file will be processed and made available for high-quality streaming with metadata.
                    </p>
                </div>
            `;
            break;
    }
    
    parametersTitle.textContent = title;
    parametersForm.innerHTML = formHTML;
    
    // Add event listeners for range inputs
    const rangeInputs = parametersForm.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        input.addEventListener('input', function() {
            const valueSpan = this.parentNode.querySelector('.range-value');
            if (valueSpan) {
                valueSpan.textContent = this.value;
            }
        });
    });
}

function toggleCutJoinOptions() {
    const operation = document.getElementById('operation').value;
    const cutOptions = document.getElementById('cutOptions');
    const joinOptions = document.getElementById('joinOptions');
    
    if (operation === 'cut') {
        cutOptions.style.display = 'block';
        joinOptions.style.display = 'none';
    } else {
        cutOptions.style.display = 'none';
        joinOptions.style.display = 'block';
    }
}

function showProcessingOptions() {
    parametersSection.style.display = 'none';
    processingOptions.style.display = 'block';
}

async function processAudio() {
    if (!selectedFile || !selectedAction) {
        alert('Please select a file and processing option');
        return;
    }
    
    // Show processing status
    parametersSection.style.display = 'none';
    processingStatus.style.display = 'block';
    
    const statusMessage = document.getElementById('statusMessage');
    const progressFill = document.getElementById('progressFill');
    
    // Simulate progress
    progressFill.style.width = '10%';
    statusMessage.textContent = 'Uploading file...';
    
    try {
        // Create form data
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        // Add parameters based on selected action
        const parameters = getProcessingParameters();
        for (const [key, value] of Object.entries(parameters)) {
            formData.append(key, value);
        }
        
        // Update progress
        progressFill.style.width = '30%';
        statusMessage.textContent = 'Processing with AI...';
        
        // Make API request
        const response = await fetch(`/${selectedAction.replace('_', '-')}`, {
            method: 'POST',
            body: formData
        });
        
        progressFill.style.width = '70%';
        statusMessage.textContent = 'Finalizing results...';
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Complete progress
        progressFill.style.width = '100%';
        statusMessage.textContent = 'Processing complete!';
        
        // Show results
        setTimeout(() => {
            showResults(result);
        }, 1000);
        
    } catch (error) {
        console.error('Processing error:', error);
        statusMessage.textContent = 'Processing failed. Please try again.';
        
        setTimeout(() => {
            parametersSection.style.display = 'block';
            processingStatus.style.display = 'none';
        }, 2000);
    }
}

function getProcessingParameters() {
    const parameters = {};
    
    switch(selectedAction) {
        case 'remove-vocals':
            parameters.output_format = document.getElementById('outputFormat')?.value || 'mp3';
            parameters.quality = document.getElementById('quality')?.value || 'medium';
            break;
            
        case 'pitch-tempo':
            parameters.pitch_shift = parseFloat(document.getElementById('pitchShift')?.value || 0);
            parameters.tempo_change = parseFloat(document.getElementById('tempoChange')?.value || 1.0);
            parameters.preserve_formants = document.getElementById('preserveFormants')?.value === 'true';
            break;
            
        case 'convert-format':
            parameters.target_format = document.getElementById('targetFormat')?.value || 'mp3';
            parameters.bitrate = parseInt(document.getElementById('bitrate')?.value || 320);
            parameters.sample_rate = parseInt(document.getElementById('sampleRate')?.value || 44100);
            break;
            
        case 'cut-join':
            parameters.operation = document.getElementById('operation')?.value || 'cut';
            if (parameters.operation === 'cut') {
                parameters.start_time = parseFloat(document.getElementById('startTime')?.value || 0);
                const endTime = document.getElementById('endTime')?.value;
                if (endTime) parameters.end_time = parseFloat(endTime);
            } else {
                const joinFile = document.getElementById('joinFile')?.files[0];
                if (joinFile) parameters.join_file = joinFile;
            }
            break;
            
        case 'reduce-noise':
            parameters.noise_reduction_strength = parseFloat(document.getElementById('noiseReductionStrength')?.value || 0.5);
            parameters.preserve_music = document.getElementById('preserveMusic')?.value === 'true';
            break;
            
        case 'play-audio':
            // No additional parameters needed
            break;
    }
    
    return parameters;
}

function showResults(result) {
    processingStatus.style.display = 'none';
    resultsSection.style.display = 'block';
    
    const audioPlayer = document.getElementById('audioPlayer');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Create audio player if result has audio URL
    if (result.audio_url || result.download_url) {
        const audioUrl = result.audio_url || result.download_url;
        audioPlayer.innerHTML = `
            <audio controls style="width: 100%;">
                <source src="${audioUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <div style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                <p><strong>File:</strong> ${result.filename || 'processed_audio'}</p>
                <p><strong>Duration:</strong> ${result.duration || 'Unknown'}</p>
                <p><strong>Format:</strong> ${result.format || 'Audio'}</p>
            </div>
        `;
        
        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = result.filename || 'processed_audio';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    } else {
        // Show result message for endpoints that don't return files yet
        audioPlayer.innerHTML = `
            <div style="padding: 2rem; background: #f0f8ff; border-radius: 8px; text-align: center;">
                <i class="fas fa-info-circle" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
                <h4>Processing Successful!</h4>
                <p style="color: #666; margin-bottom: 1rem;">${result.message || 'Your audio has been processed successfully.'}</p>
                <div style="background: white; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
                    <pre style="margin: 0; font-size: 0.9rem; color: #333;">${JSON.stringify(result, null, 2)}</pre>
                </div>
            </div>
        `;
        
        downloadBtn.style.display = 'none';
    }
}

function resetUpload() {
    selectedFile = null;
    selectedAction = null;
    
    // Reset file input
    fileInput.value = '';
    
    // Reset UI
    uploadArea.style.display = 'block';
    processingOptions.style.display = 'none';
    parametersSection.style.display = 'none';
    processingStatus.style.display = 'none';
    resultsSection.style.display = 'none';
    
    // Reset upload area content
    const uploadContent = uploadArea.querySelector('.upload-content');
    uploadContent.innerHTML = `
        <i class="fas fa-cloud-upload-alt upload-icon"></i>
        <h3>Choose File or Drop it Here</h3>
        <p>Supports MP3, WAV, FLAC, M4A, AAC, OGG and more</p>
        <p class="file-limits">Maximum file size: 100MB</p>
        <button class="upload-btn" onclick="document.getElementById('fileInput').click()">
            <i class="fas fa-plus"></i> Choose File
        </button>
    `;
    
    // Remove selected class from option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});