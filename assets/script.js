let months = ["January", "February", "March", "April", "May", "June", "Sol", "Luna", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"],
    daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Function to calculate the IFC date

function get13MonthDate() {
    
	let now = new Date(),
        yearStart = new Date(now.getFullYear(), 0, 1),
        totalDaysInYear = 364,
        isLeapYear = now.getFullYear() % 4 === 0 && (now.getFullYear() % 100 !== 0 || now.getFullYear() % 400 === 0),
        currentYearDay = Math.floor((now - yearStart) / (1000 * 60 * 60 * 24)) + 1,
        month, day, isYearDay = false, isLeapDay = false;

    // Handle Year Day and Leap Day
    
	if (currentYearDay === 365 || (isLeapYear && currentYearDay === 366)) {
        
		isYearDay = currentYearDay === 365;
        isLeapDay = currentYearDay === 366;
        
		return { isYearDay, isLeapDay, currentDate: now };
    
	}

    // Regular date calculation
    
	month = Math.ceil(currentYearDay / 28);
    day = ((currentYearDay - 1) % 28) + 1;

    return { month, day, currentDate: now, isYearDay, isLeapDay };

}

// Function to determine the season

function getSeason(month) {
    
	if (month === 1 || month === 2 || month === 3) return "Winter";
    if (month === 4 || month === 5 || month === 6) return "Spring";
    if (month === 7 || month === 8 || month === 9) return "Summer";
    if (month === 10 || month === 11 || month === 12 || month === 13) return "Autumn";
    
	return "Neutral";

}

// Function to render the calendar

function renderCalendar() {
    
	let { month: currentMonth, day: currentDay, currentDate, isYearDay, isLeapDay } = get13MonthDate(),
        calendar = document.getElementById("calendar"),
        formattedDate = isYearDay
            ? `Year Day, ${currentDate.getFullYear()}`
            : isLeapDay
            ? `Leap Day, ${currentDate.getFullYear()}`
            : `${currentDay} ${months[currentMonth - 1]} ${currentDate.getFullYear()}`;

    // Update the page title and date display
    
	document.title = `IFC, ${formattedDate}`;
    document.getElementById("date").innerText = formattedDate;

    // Clear previous calendar content
    
	calendar.innerHTML = "";

    // Add months to the calendar
    
	months.forEach((monthName, monthIndex) => {
        
		let monthNumber = monthIndex + 1,
            season = getSeason(monthNumber),
            monthDiv = document.createElement("div"),
            isCurrentMonth = monthNumber === currentMonth,
            title = `${monthName} (${season})`,
            daysDiv = document.createElement("div");

        monthDiv.className = "month " + season;
        monthDiv.innerHTML = `<h2>${title}</h2>`;

        daysDiv.className = "days";

        // Add day names to the first row
        
		daysOfWeek.forEach(day => {
            
			let dayNameDiv = document.createElement("div");
            
			dayNameDiv.className = "day-name";
            dayNameDiv.textContent = day;
            daysDiv.appendChild(dayNameDiv);
        
		});

        // Add days to the month
        
		for (let day = 1; day <= 28; day++) {
            
			let dayDiv = document.createElement("div");
            
			dayDiv.className = "day";

            if (isCurrentMonth && currentDay === day && !isYearDay && !isLeapDay) {
                dayDiv.classList.add("today");
            }

            dayDiv.textContent = day;
            daysDiv.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysDiv);
        calendar.appendChild(monthDiv);
    
	});

}

// Initialize the calendar

renderCalendar();