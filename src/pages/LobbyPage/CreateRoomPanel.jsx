import { Globe, Lock, Plus } from "lucide-react";
import { useState } from "react";
import { Box, Switch } from "@mui/material";
import { styled } from "@mui/system";
import { createDraftRoom, generateRoomCode } from "../../data/rooms";
import {
  BlockPrimaryButton,
  Field,
  FieldLabel,
  InputShell,
  Panel,
  PanelBody,
  PanelHeader,
  PanelTitle,
  TextInput,
} from "./LobbyPage.styles";

const SwitchField = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  minHeight: "40px",
});

const SwitchLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: active ? "var(--accent-strong)" : "var(--muted)",
  fontSize: "0.8rem",
}));

function CreateRoomPanel({ onCreateRoom }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomName, setRoomName] = useState("");

  // Function to handle the creation of a new room
  function handleCreateRoom() {
    const normalizedName = roomName.trim();

    // openRoom function is passed down from the parent component (LobbyPage)
    onCreateRoom(
      createDraftRoom({
        id: generateRoomCode(),
        name: normalizedName || "New Room",
        publicRoom: !isPrivate,
      }),
    );
  }

  return (
    <Panel component="section">
      <PanelHeader component="header">
        <PanelTitle component="h2" variant="h2">
          Room Setup
        </PanelTitle>
      </PanelHeader>

      <PanelBody>
        <Field component="label">
          <FieldLabel component="span">Room name</FieldLabel>
          <InputShell>
            <TextInput
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
              required
            />
          </InputShell>
        </Field>

        <Field>
          <FieldLabel component="span">Visibility</FieldLabel>
          <SwitchField>
            {/* Toggles the display */}
            {!isPrivate ? (
              <SwitchLabel component="span" active>
                <Globe size={14} strokeWidth={2} color="#27a656" />
                Public
              </SwitchLabel>
            ) : (
              <SwitchLabel component="span" active={isPrivate}>
                <Lock size={14} strokeWidth={2} color="#c04b4b" />
                Private
              </SwitchLabel>
            )}
            <Switch
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              color="primary"
            />
          </SwitchField>
        </Field>

        <BlockPrimaryButton
          type="button"
          variant="contained"
          startIcon={<Plus size={14} strokeWidth={2} />}
          onClick={handleCreateRoom}
        >
          Create room
        </BlockPrimaryButton>
      </PanelBody>
    </Panel>
  );
}

export default CreateRoomPanel;
