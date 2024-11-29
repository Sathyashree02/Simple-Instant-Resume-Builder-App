document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const resumeOutput = document.getElementById('resume-output');
    const progressBar = document.getElementById('progress');
    const downloadBtn = document.getElementById('download-pdf');

    const updateProgress = () => {
        const totalFields = form.elements.length;
        let filledFields = 0;
        for (let i = 0; i < totalFields; i++) {
            if (form.elements[i].value && form.elements[i].type !== 'button' && form.elements[i].type !== 'checkbox' && form.elements[i].type !== 'select-one') {
                filledFields++;
            } else if (form.elements[i].type === 'checkbox' && form.elements[i].checked) {
                filledFields++;
            }
        }
        const progress = (filledFields / totalFields) * 100;
        progressBar.style.width = progress + '%';
    };

    const updateResume = () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const summary = document.getElementById('summary').value;

        let educationHTML = '';
        document.querySelectorAll('.education').forEach(edu => {
            educationHTML += `<p>${edu.value}</p>`;
        });

        let skillsHTML = '';
        document.querySelectorAll('input[name="skills"]:checked').forEach(skill => {
            const skillLevel = document.getElementById(`${skill.id}-level`).value;
            skillsHTML += `<p>${skill.value} (${skillLevel})</p>`;
        });

        let experienceHTML = '';
        document.querySelectorAll('.experience').forEach(exp => {
            experienceHTML += `<p>${exp.value}</p>`;
        });

        resumeOutput.innerHTML = `
            <h3>${name}</h3>
            <p>${email}</p>
            <p>${phone}</p>
            <h4>Profile Summary</h4>
            <p>${summary}</p>
            <h4>Education</h4>
            ${educationHTML}
            <h4>Skills</h4>
            ${skillsHTML}
            <h4>Experience</h4>
            ${experienceHTML}
        `;
        updateProgress();
    };

    form.addEventListener('input', updateResume);

    document.getElementById('add-education').addEventListener('click', () => {
        const newEducation = document.createElement('input');
        newEducation.type = 'text';
        newEducation.className = 'education';
        newEducation.placeholder = 'Degree, Institution, Year';
        document.getElementById('education-container').appendChild(newEducation);
        newEducation.addEventListener('input', updateResume);
        updateResume();
    });

    document.getElementById('add-experience').addEventListener('click', () => {
        const newExperience = document.createElement('input');
        newExperience.type = 'text';
        newExperience.className = 'experience';
        newExperience.placeholder = 'Job Title, Company, Year';
        document.getElementById('experience-container').appendChild(newExperience);
        newExperience.addEventListener('input', updateResume);
        updateResume();
    });

    document.getElementById('clear-form').addEventListener('click', () => {
        resumeOutput.innerHTML = '';
        progressBar.style.width = '0%';
    });

    downloadBtn.addEventListener('click', () => {
        const pdfContent = document.getElementById('resume-output').innerHTML;
        const pdfWindow = window.open('', '', 'width=800,height=600');
        pdfWindow.document.write(`
            <html>
                <head>
                    <title>Resume PDF</title>
                </head>
                <body>
                    <div>${pdfContent}</div>
                </body>
            </html>
        `);
        pdfWindow.document.close();
        pdfWindow.print();
    });
});
