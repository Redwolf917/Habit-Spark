document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('next-button');

    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect user input
        const workouts = [];
        const workoutEntries = document.querySelectorAll('.form-group');
        workoutEntries.forEach(entry => {
            const name = entry.querySelector('select').value;
            const unit = entry.querySelectorAll('select')[1].value;
            const value = entry.querySelector('input').value;
            workouts.push({ name, unit, value });
        });

        // Store the data in localStorage
        localStorage.setItem('coreWorkouts', JSON.stringify(workouts));

        // Redirect to the next page
        window.location.href = 'lower-body-workouts.html';
    });
});
