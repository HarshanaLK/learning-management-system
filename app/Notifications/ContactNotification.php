<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ContactNotification extends Notification
{
    use Queueable;

    protected $data;

    /**
     * Create a new notification instance.
     *
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $helpNeeded = is_array($this->data['helpNeeded'])
            ? implode(', ', $this->data['helpNeeded']) 
            : $this->data['helpNeeded'];

        return (new MailMessage)
            ->subject('New Inquiry Submission')
            ->greeting('Hello Admin,')
            ->line('You have received a new inquiry.')
            ->line('Type: ' . $helpNeeded)
            ->line('Name: ' . $this->data['name'])
            ->line('Email: ' . $this->data['email'])
            ->line('Phone Number: ' . $this->data['contactNumber'])
            ->line('Message: ' . $this->data['message'])
            ->salutation('Thank you.');
    }
}
