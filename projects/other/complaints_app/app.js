const numComplaintsInput = document.querySelector('.complaints-search-bar input');
const complaintsSearchOutput = document.querySelector('.complaints-search-output');

const fetchedData = [];

window.onload = () => {
    fetch(' https://data.cityofnewyork.us/resource/erm2-nwe9.json')
        .then((resp) => resp.json())
        .then((json) => fetchedData = json);
}

const complaintTemplate = (complaintTitle, response, index) =>
    `
            <div class="complaint">
                <div class="complaint-title">
                    <h3>${complaintTitle}</h3>
                    <button onclick="toggleResponse(${index})">What did the police do?</button>
                </div>
                <div class="complaint-response">
                    <h4>${response}</h4>
                </div>
            </div>
`

const toggleResponse = (index) => {
    let complaintResponses = document.getElementsByClassName('complaint-response');
    let complaintResponse = complaintResponses[index];

    console.log(complaintResponses);

    if (complaintResponse.classList.contains('active')) {
        complaintResponse.classList.remove('active');
    } else {
        complaintResponse.classList.add('active');
    }
}

const lookupComplaint = (borough) => {
    let boroughComplaints = [];
    // console.log('Loading complaints...');
    // console.log('Number of complaints: ' + numComplaintsInput.value);

    fetch(' https://data.cityofnewyork.us/resource/erm2-nwe9.json')
        .then((resp) => resp.json())
        .then((json) => {
            let tempBoroughComplaints = json
                .filter(jsonObject => jsonObject.borough === borough)
                .map(boroughObject => (
                    {
                        complaintTitle: boroughObject.complaint_type,
                        response: boroughObject.resolution_description === undefined
                            ? boroughObject.status
                            : boroughObject.resolution_description
                    }
                ));

            if (numComplaintsInput.value === '') {
                boroughComplaints = tempBoroughComplaints;
            }
            else {
                let numberOfComplaints = Math.floor(numComplaintsInput.value);
                for (let i = 0; i < numberOfComplaints; i++) {
                    let complaint = tempBoroughComplaints[i];
                    boroughComplaints.push(complaint);
                }
            }
        })
        .finally(() => {
            complaintsSearchOutput.innerHTML = '';

            boroughComplaints.forEach((complaint, index) => {
                let newComplaintDiv = complaintTemplate(complaint.complaintTitle, complaint.response, index);
                complaintsSearchOutput.innerHTML += newComplaintDiv;
            });
        })
}



