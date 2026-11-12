
'use client'

import { cn, getSubjectColor, configureAssistant } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk"
import { useEffect, useRef, useState } from "react"
import Lottie from "lottie-react"
import type { LottieRefCurrentProps } from "lottie-react"
import soundwaves from "@/constants/soundwaves.json"
import { addToSessionHistory } from "@/lib/actions/companion.action"

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

type SavedMessage = {
  role: "user" | "assistant";
  content: string;
};

const CompanionComponent = ({
    name,
    topic,
    subject,
    voice,
    userName,
    userImage,
    companionId,
    style
}: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)

    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null)

    // Control Lottie animation
    useEffect(() => {
        if (isSpeaking) {
            lottieRef.current?.play()
        } else {
            lottieRef.current?.stop()
        }
    }, [isSpeaking])

    // Vapi event listeners
    useEffect(() => {

        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE)
        }

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            setIsSpeaking(false)
            setIsMuted(false)

            //session History will be added(using Companion Id)
            addToSessionHistory(companionId)
        }


{/*const onMessage = (message: any) => {
  console.log("VAPI MESSAGE:", message);

  // Student's speech
  if (
    message.type === "transcript" &&
    message.transcriptType === "final" &&
    message.role === "user"
  ) {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message.transcript,
      },
    ]);
  }

  // AI tutor's speech
  if (
    message.type === "assistant.speechStarted" &&
    message.text?.trim()
  ) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: message.text,
      },
    ]);
  }
};*/}   
        const onMessage = (message: any) => {
  console.log("VAPI MESSAGE RECEIVED:", message);
};

        const onSpeechStart = () => {
            setIsSpeaking(true)
        }

        const onSpeechEnd = () => {
            setIsSpeaking(false)
        }

       const onError = (error: unknown) => {
    console.error("Vapi Error:", error);

    if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
    } else {
        console.error(
            "Error details:",
            JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
        );
    }

    setCallStatus(CallStatus.INACTIVE);
    setIsSpeaking(false);
};

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)
        vapi.on('error', onError)
        vapi.on('message', onMessage)
        

        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
            vapi.off('error', onError)
           
        }

    }, [])

    // Toggle microphone
    const toggleMicrophone = () => {

        // Don't allow microphone changes without an active call
        if (callStatus !== CallStatus.ACTIVE) return

        const muted = vapi.isMuted()

        vapi.setMuted(!muted)

        setIsMuted(!muted)
    }

    // Start call
    const handleCall = async () => {

        if (
            callStatus === CallStatus.CONNECTING ||
            callStatus === CallStatus.ACTIVE
        ) return

        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
        variableValues: {
        subject,
        topic,
        style,
        },
    
    
        } ;

        try {
            await vapi.start(
                configureAssistant(voice, style),
                assistantOverrides
            )
        } catch (error) {
            console.error("Failed to start call:", error)
            setCallStatus(CallStatus.INACTIVE)
        }
    }

    // Disconnect call
    const handleDisconnect = async () => {
        if (callStatus !== CallStatus.ACTIVE) return

        try {
            await vapi.stop()
        } catch (error) {
            console.error("Failed to stop call:", error)
        }
    }

    return (
        <section className="flex flex-col h-[70vh]">

            <section className="flex gap-8 max-sm:flex-col">

                {/* Companion section */}
                <div className="companion-section">

                    <div
                        className="companion-avatar"
                        style={{
                            backgroundColor: getSubjectColor(subject)
                        }}
                    >

                        {/* Subject icon */}
                        <div
                            className={cn(
                                'absolute transition-opacity duration-1000',
                                callStatus === CallStatus.FINISHED ||
                                callStatus === CallStatus.INACTIVE
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                callStatus === CallStatus.CONNECTING &&
                                'opacity-100 animate-pulse'
                            )}
                        >
                            <img
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={150}
                                height={150}
                                className="max-sm:w-fit"
                            />
                        </div>

                        {/* Soundwave animation */}
                        <div
                            className={cn(
                                'absolute transition-opacity duration-1000',
                                callStatus === CallStatus.ACTIVE
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            )}
                        >
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                                className="companion-lottie"
                            />
                        </div>

                    </div>

                    <p className="font-bold text-2xl">
                        {name}
                    </p>

                </div>

                {/* User section */}
                <div className="user-section">

                    <div className="user-avatar">

                        <img
                            src={userImage}
                            alt={userName}
                            width={130}
                            height={130}
                            className="rounded-lg"
                        />

                        <p className="font-bold text-2xl">
                            {userName}
                        </p>

                    </div>

                    {/* Microphone button */}
                    <button
                        className="btn-mic"
                        onClick={toggleMicrophone}
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        <img
                            src={
                                isMuted
                                    ? '/icons/mic-off.svg'
                                    : '/icons/mic-on.svg'
                            }
                            alt="mic"
                            width={36}
                            height={36}
                        />

                        <p className="max-sm:hidden">
                            {isMuted
                                ? 'Turn-on mic'
                                : 'Turn-off Mic'}
                        </p>
                    </button>

                    {/* Start / End session button */}
                    <button
                        className={cn(
                            'rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
                            callStatus === CallStatus.ACTIVE
                                ? 'bg-red-700'
                                : 'bg-primary',
                            callStatus === CallStatus.CONNECTING &&
                                'animate-pulse'
                        )}
                        disabled={callStatus === CallStatus.CONNECTING}
                        onClick={
                            callStatus === CallStatus.ACTIVE
                                ? handleDisconnect
                                : handleCall
                        }
                    >
                        {callStatus === CallStatus.ACTIVE
                            ? 'End-session'
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting...'
                                : callStatus === CallStatus.FINISHED
                                    ? 'Start Session Again'
                                    : 'Start Session'}
                    </button>

                </div>

            </section>

            {/* Transcript section */}
          <section className="transcript">
  <div className="transcript-message">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`${
          message.role === "assistant"
            ? "bg-blue-100 self-start"
            : "bg-green-100 self-end"
        } rounded-xl p-4 max-w-[80%]`}
      >
        <p className="font-semibold text-sm mb-1">
          {message.role === "assistant" ? "AI Tutor" : "You"}
        </p>

        <p>{message.content}</p>
      </div>
    ))}
  </div>
</section>
        </section>
    )
}

export default CompanionComponent
