import { useState } from "react";
import SettingsOptions from "../../components/SettingsComponents/SettingsOptions/SettingsOptions";
import './Settings.css';
import SettingBox from "../../components/SettingsComponents/SettingBox/SettingBox";

export default function Settings() {

    const [selectedOption, setSelectedOption] = useState('edit-profile');

    return (
        <div className="settings">
            <SettingsOptions selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <SettingBox selectedOption={selectedOption} />
        </div>
    );
}