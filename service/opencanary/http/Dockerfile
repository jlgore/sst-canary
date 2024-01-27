FROM python:3.10-buster

# Download cache lists and install minimal versions
RUN apt-get update && apt-get -yq install --no-install-recommends \
	# Required linux dependencies
	sudo vim build-essential libssl-dev libffi-dev python-dev libpcap-dev && \
	# Remove cache lists and clean up anything not needed to minimize image size
	apt-get autoremove -yq && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create and set the working directory
WORKDIR /opencanary

# Copy only the files needed to install dependencies
RUN git clone https://github.com/thinkst/opencanary.git ./

# Install the required dependencies
RUN pip install -r requirements.txt
RUN pip install scapy pcapy-ng

# Copy in the latest version
COPY opencanary.conf .
# Set the default application we are running
ENTRYPOINT [ "opencanaryd" ]

# Set the default arguments to be used for the entrypoint
CMD [ "--dev" ]
