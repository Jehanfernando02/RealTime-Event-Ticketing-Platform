import React, { useState } from "react";

const ConfigurationForm = ({ config, setConfig }) => {
    const [maxTickets, setMaxTickets] = useState(config.maxTickets);

    const handleSubmit = (e) => {
        e.preventDefault();
        setConfig({ ...config, maxTickets });
    };

    return (
        <form onSubmit={handleSubmit} className="configuration-form">
            <h2>Configuration</h2>
            <label>
                Max Tickets:
                <input
                    type="number"
                    value={maxTickets}
                    onChange={(e) => setMaxTickets(Number(e.target.value))}
                    min="1"
                />
            </label>
            <button type="submit">Save Configuration</button>
        </form>
    );
};

export default ConfigurationForm;
