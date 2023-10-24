// Current subject index
let currentSubject = 0;

function prevSubject() {
    if (currentSubject > 0) {
        currentSubject--;
        updateForm();
    }
}

function nextSubject() {
    // Validate input before moving to the next subject
    const isValid = validateInput();
    if (isValid && currentSubject<4) {
        console.log(currentSubject);
        currentSubject++;
        updateForm();
    }
}

function submitForm() {
    calculateAccuracy();
}

function updateForm() {
    // Get form elements
    const form = document.getElementById('subjectForm');
    const subjectContainers = form.querySelectorAll('.subject-container');

    // Hide all subject containers
    subjectContainers.forEach(container => {
        if(currentSubject < 5)
        container.classList.add('hidden');
    });

    // Show the current subject container
    if(currentSubject == 4) {
        subjectContainers[3].classList.remove('hidden');
    } else if(currentSubject < 4){
        subjectContainers[currentSubject].classList.remove('hidden');
    }

    // Update result and charts based on current subject data
    //calculateAccuracy();
}

function validateInput() {
    // Validate input here
    // Return true if input is valid, otherwise false
    return true;
}

function calculateAccuracy() {
    // Get input values for the current subject
    const physicsTotalAttempt = parseInt(document.getElementById('physicsTotalAttempt').value);
    const physicsTotalIncorrect = parseInt(document.getElementById('physicsTotalIncorrect').value);
    const TotalQuestions = parseInt(document.getElementById('TotalQuestions').value);

    const chemistryTotalAttempt = parseInt(document.getElementById('chemistryTotalAttempt').value);
    const chemistryTotalIncorrect = parseInt(document.getElementById('chemistryTotalIncorrect').value);

    const botanyTotalAttempt = parseInt(document.getElementById('botanyTotalAttempt').value);
    const botanyTotalIncorrect = parseInt(document.getElementById('botanyTotalIncorrect').value);

    const zoologyTotalAttempt = parseInt(document.getElementById('zoologyTotalAttempt').value);
    const zoologyTotalIncorrect = parseInt(document.getElementById('zoologyTotalIncorrect').value);

    const physicsAttempt = ((physicsTotalAttempt/TotalQuestions) * 100).toFixed(2);
    const physicsAccuracy = (((physicsTotalAttempt - physicsTotalIncorrect) / physicsTotalAttempt) * 100).toFixed(2);
    const chemistryAttempt = ((chemistryTotalAttempt/TotalQuestions) * 100).toFixed(2);
    const chemistryAccuracy = (((chemistryTotalAttempt - chemistryTotalIncorrect) / chemistryTotalAttempt) * 100).toFixed(2);
    const botanyAttempt = ((botanyTotalAttempt/TotalQuestions) * 100).toFixed(2);
    const botanyAccuracy = (((botanyTotalAttempt - botanyTotalIncorrect) / botanyTotalAttempt) * 100).toFixed(2);
    const zoologyAttempt = ((zoologyTotalAttempt/TotalQuestions) * 100).toFixed(2);
    const zoologyAccuracy = (((zoologyTotalAttempt - zoologyTotalIncorrect) / zoologyTotalAttempt) * 100).toFixed(2);

    const physicsMarks = ((physicsTotalAttempt - physicsTotalIncorrect) * 4) - physicsTotalIncorrect;
    const chemistryMarks = ((chemistryTotalAttempt - chemistryTotalIncorrect) * 4) - chemistryTotalIncorrect;
    const botanyMarks = ((botanyTotalAttempt - botanyTotalIncorrect) * 4) - botanyTotalIncorrect;
    const zoologyMarks = ((zoologyTotalAttempt - zoologyTotalIncorrect) * 4) - zoologyTotalIncorrect;

    const totalMarks = physicsMarks+chemistryMarks+botanyMarks+zoologyMarks;
    const accuracyArray = [physicsAccuracy,chemistryAccuracy,botanyAccuracy,zoologyAccuracy];
    const attemptArray = [physicsAttempt,chemistryAttempt,botanyAttempt,zoologyAttempt];

    const totalMaxMarks = 720;
    const maxMarks = 180;

    const subjectMarks = [
        {
            subjectName : 'phy',
            correctMarks : physicsMarks,
            totalMarks : maxMarks,
        },
        {
            subjectName : 'chem',
            correctMarks : chemistryMarks,
            totalMarks : maxMarks,
        },
        {
            subjectName : 'bot',
            correctMarks : botanyMarks,
            totalMarks : maxMarks,
        },
        {
            subjectName : 'zoo',
            correctMarks : zoologyMarks,
            totalMarks : maxMarks,
        },
        {
            subjectName : 'missed',
            correctMarks : 720-totalMarks,
            totalMarks : totalMaxMarks,
        },
    ];

    // Calculate accuracy for the current subject
    //const accuracy = (correct / total) * 100;

    // Update the result div
    document.getElementById('totalMarks').innerHTML = `Total Marks Obtained: ${totalMarks}`;
    document.getElementById('resultPhysics').innerHTML = `Physics: ${physicsMarks}`;
    document.getElementById('resultChemistry').innerHTML = `Chemistry: ${chemistryMarks}`;
    document.getElementById('resultBotany').innerHTML = `Botany: ${botanyMarks}`;
    document.getElementById('resultZoology').innerHTML = `Zoology: ${zoologyMarks}`;
    document.getElementById('totalMissed').innerHTML = `Missed Marks: ${720-totalMarks}`;
    // Update the accuracy graph
    updateAccuracyGraph(accuracyArray,'accuracyGraph');
    updateAccuracyGraph(attemptArray,'attemptGraph');

    // Update the pie chart
    updatePieChart(subjectMarks);
    //const greenPercentage = ((totalMarks/totalMaxMarks) * 100).toFixed(2);
    //const redPercentage = ((totalMaxMarks-totalMarks)/totalMaxMarks * 100).toFixed(2);
    //const styledLine = document.getElementById('styledLine');
    //styledLine.style.background = `linear-gradient(to right, #4CAF50 ${greenPercentage}%, #FF5733 ${redPercentage}%)`;
}

function updateAccuracyGraph(accuracyArray,idOfGraph) {
    const canvas = document.getElementById(idOfGraph);
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw multiple rectangles based on accuracy
    const numRectangles = accuracyArray.length; // Change this as needed
    const rectWidth = canvas.width / numRectangles;
    const colors = ['#4caf50', '#2196F3', '#FFC107', '#E91E63'];

    for (let i = 0; i < numRectangles; i++) {
        const fillHeight = (accuracyArray[i] / 100) * canvas.height;

        ctx.fillStyle = colors[i];
        ctx.fillRect(i * rectWidth, canvas.height - fillHeight, rectWidth, fillHeight);
        // Draw number label
        const labelX = i * rectWidth + rectWidth / 2;
        const labelY = canvas.height - fillHeight - 5; // Adjust the vertical position
        ctx.fillStyle = '#000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`${accuracyArray[i]}%`, labelX, labelY);
    }

    // Draw threshold line
    const thresholdValue = 85; // Change this to your desired threshold
    const thresholdY = canvas.height - (thresholdValue / 100) * canvas.height;

    ctx.strokeStyle = '#66ff99'; // Red color for the threshold line
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, thresholdY);
    ctx.lineTo(canvas.width, thresholdY);
    ctx.stroke();

    // Draw x-axis labels
    const labels = ['physics','chemistry','botany','zoology'];
    for (let i = 0; i < numRectangles; i++) {
        const labelX = i * rectWidth + rectWidth / 2;
        const labelY = canvas.height + 5; // Adjust the vertical position
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[i], labelX, labelY);
    }
}

function updatePieChart(subjectMarks) {
    const pieChartCanvas = document.getElementById('pieChart');
    const ctx = pieChartCanvas.getContext('2d');
    const radius = pieChart.width / 2;
    const centerX = radius;
    const centerY = radius;

    // Clear the pie chart
    ctx.clearRect(0, 0, pieChartCanvas.width, pieChartCanvas.height);

    const totalSubjects = subjectMarks.length;
    let currentAngle = -Math.PI / 2; // Start from the top
    const colors = ['#4caf50', '#2196F3', '#FFC107', '#E91E63', '#66ff99']; // Change colors as needed

    for (let i = 0; i < totalSubjects; i++) {
        const accuracy = (subjectMarks[i].correctMarks / subjectMarks[i].totalMarks) * 100;
        const segmentAngle = (accuracy / 500) * (2 * Math.PI);
        const segmentText = `${accuracy.toFixed(2)}% (${subjectMarks[i].subjectName})`;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();

        // Draw the border for each segment
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text in the center of the segment
        //const textX = centerX + radius * Math.cos(currentAngle + segmentAngle / 2);
        //const textY = centerY + radius * Math.sin(currentAngle + segmentAngle / 2);

        const textX = centerX + (radius - 40) * Math.cos(currentAngle + segmentAngle / 2);
        const textY = centerY + (radius - 40) * Math.sin(currentAngle + segmentAngle / 2);


        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(segmentText, textX, textY);

        currentAngle += segmentAngle;
    }
}

// Initial form update
updateForm();