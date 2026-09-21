(function () {
    var form = document.getElementById('event-inquiry-form');
    var status = document.getElementById('event-status');
    var button = form.querySelector('button[type="submit"]');
    var fields = [
        ['Name', 'name'], ['Email', 'email'], ['Phone', 'phone'],
        ['Event Date', 'date'], ['Venue/City', 'venue'], ['Event Type', 'type'],
        ['Performance Type', 'performance'], ['Approximate Performance Time', 'time'],
        ['Message', 'message']
    ];

    function escapeHtml(value) {
        return value.replace(/[&<>"']/g, function (character) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
        });
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (button.disabled || !form.reportValidity()) return;
        button.disabled = true;
        status.textContent = 'Sending your inquiry…';
        try {
            var message = fields.map(function (field) {
                return field[0] + ': ' + escapeHtml(form.elements[field[1]].value.trim() || 'Not provided').replace(/\r?\n/g, '<br>');
            }).join('<br>');
            await emailjs.send('default_service', 'template_EmZm7CuX', {
                reply_to: form.elements.email.value.trim(),
                from_name: form.elements.name.value.trim() + ' (' + form.elements.email.value.trim() + ')',
                to_name: 'Kamal',
                message_html: 'Live music booking inquiry<br><br>' + message
            });
            form.reset();
            status.textContent = 'Thank you! Your inquiry has been sent. Kamal will be in touch about availability and a quote.';
        } catch (error) {
            status.textContent = 'Your inquiry could not be sent. Please try again. Your details are still here.';
        } finally {
            button.disabled = false;
        }
    });
})();
