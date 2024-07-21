import React, { useState } from "react";
import "./ContactPage.css";

export const ContactPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleSubmit = () => {
    if (firstName && lastName && email && phoneNumber && message) {
      setNotification("Your message has been sent!");
      // Reset the fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
    } else {
      setNotification("Please fill out all fields.");
    }
    setNotificationVisible(true);
    // Hide notification after 3 seconds
    setTimeout(() => setNotificationVisible(false), 3000);
  };

  return (
    <div className="contact-us">
      <div className="div">
        <div className="group">
          <div className="text-wrapper">Contact Us</div>
          <p className="p">Any question or remarks? Just write us a message!</p>
        </div>
        <div className="overlap">
          <div className="overlap-group">
            <div className="overlap-wrapper">
              <div className="overlap-2">
                <div className="frame-wrapper">
                  <div className="frame">
                    <div className="overlap-group-2">
                      <div className="ellipse" />
                      <div className="ellipse-2" />
                      <div className="text-wrapper-2">Contact Information</div>
                      <div className="group-2">
                        <img className="carbon-location" alt="Carbon location" src="locate.png" />
                        <div className="group-3">
                          <img className="img" alt="Bxs phone call" src="phone.png" />
                          <div className="text-wrapper-3">+63 2298 6986592</div>
                        </div>
                        <div className="group-4">
                          <img className="img" alt="Ic sharp email" src="mail.png" />
                          <div className="text-wrapper-4">shopsavvy@gmail.com</div>
                        </div>
                        <div className="text-wrapper-5">Cebu City, Cebu</div>
                      </div>
                      <p className="text-wrapper-6">Say something to start a live chat!</p>
                    </div>
                  </div>
                </div>
                <div className="group-5">
                  <img className="vector" alt="Vector" src="line.png" />
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div className="group-6">
                  <img className="vector" alt="Vector" src="line.png" />
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="group-7">
                  <img className="vector" alt="Vector" src="line.png" />
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div className="group-8">
                  <img className="vector-2" alt="Vector" src="longline.png" />
                  <textarea
                    className="input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message.."
                  />
                </div>
                <div className="group-wrapper">
                  <div className="group-9">
                    <img className="vector" alt="Vector" src="line.png" />
                    <input
                      type="text"
                      className="input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div className="div-wrapper">
                  <button className="send-button" onClick={handleSubmit}>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
            <img className="letter-send" alt="Letter send" src="letterSend.png" />
            <img className="nxq-logon" alt="Nxq logon" src="nxQ_Logo_new.png" />
          </div>
        </div>
      </div>
      <div className={`notification ${notificationVisible ? 'show' : 'hide'}`}>
        {notification}
      </div>
    </div>
  );
};

export default ContactPage;
